import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export interface MoneyData {
  id: number;
  name: string;
  current_value: number;
  previous_value: number;
  variation: number;
  status: string;
  last_update: Date;
}

@Injectable()
export class MoneyService {
  // Os valores das moedas são armazenados nessa variavel
  values: MoneyData[];
  
  // O construtor chama o metodo attValues e start
  constructor(private prisma: PrismaService) {
    this.attValues();
    this.start();
  }

  // A função start carrega todas os registros do db na variavel values
  // fazendo com que as requisições não precisem fazer consultas no db
  private async start() {
    this.values = await this.findAll();
  }

  // attValues a cada 60 minutos atualiza as moedas
  private attValues(): void {
    const intervalDuration = 60 * 60 * 1000;

    setInterval(() => {
      this.values.forEach((item: MoneyData) => {
        item.previous_value = item.current_value;
        item.variation = this.randomVariation();
        item.current_value = this.limitateDecimal(item.current_value * (1 + item.variation));
        item.status = item.variation > 0 ? 'valued' : 'devalued';
        item.last_update = new Date();
      });
      this.managerUpdate()
    }, intervalDuration)
  }

  // a função asincrona managerUpdate escreve os dados atualizados no db
  // como existe um bug no prisma com sqlit que não permite varias atualizações ao mesmo tempo
  // por isso a função assincrona atualiza o db e espera um segundo para fazer a proxima atualizaçã
  private async managerUpdate() {
    for(const item of this.values) {
      this.update(item);
      await this.delay();
    }
  }

  private async delay(): Promise<void>{
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  private limitateDecimal(num: number){
    return Math.round(num * 10000) / 10000;
  }

  private randomVariation(): number {
    return (Math.floor(Math.random() * (1001 - (-1001) + 1)) + (-1001))/10000;
  }

  private async findAll(): Promise<MoneyData[]> {
    const moneyList = await this.prisma.money.findMany();

    return moneyList.map((money) => ({
      id: money.id,
      name: money.name,
      current_value: Number(money.current_value),
      previous_value: Number(money.previous_value),
      variation: Number(money.variation),
      status: money.status,
      last_update: new Date(money.last_update),
    }));
  }

  // faz uma comparação entre a string do parametro recebida, se ela estiver em values, retorna uma 
  // moeda especifica, senão lança NotFounsException
  findOne(name: string) {
    const specific: MoneyData = this.values.find((item) => item.name.toLowerCase() === name.toLowerCase());
    if(specific == undefined)
      throw new NotFoundException(`${name} is not a valid currency in our quote.`) 
    return specific;
  }

  private async update(values: MoneyData) {
      await this.prisma.money.update({
        where:{
          id: values.id,
        },
        data: {
          previous_value: values.previous_value,
          variation: values.variation,
          current_value: values.current_value,
          status: values.status,
          last_update: values.last_update
        },
      });
  }
}
