import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>
  ) {}



  create(createClientDto: CreateClientDto) {
    const client = this.clientRepository.create(createClientDto)
    return this.clientRepository.save(client)
  }

  findAll() {
    return this.clientRepository.find();
  }

  findOne(id: number) {
    return this.clientRepository.findOneBy({id});
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.findOne(id);
    if(!client){
      throw new NotFoundException('Client not found');
    }
    Object.assign(client, updateClientDto)
    return this.clientRepository.save(client);
  }

  async remove(id: number) {
    const client = await this.findOne(id);
    if(!client){
      throw new NotFoundException('Client not found');
    }
     await this.clientRepository.remove(client)
  }
}
