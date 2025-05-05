import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name)

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>
  ) {}



  create(createClientDto: CreateClientDto) {
    this.logger.log(`Creating client: ${JSON.stringify(createClientDto)}`);
    const client = this.clientRepository.create(createClientDto)
    const savedClient = this.clientRepository.save(client)
    this.logger.log(`Client created:  ${savedClient}`)
    return savedClient;
  }

  findAll() {
    this.logger.log('Fetching all clients');
    const clients = this.clientRepository.find();
    return clients;
  }
 

  findOne(id: number) {
    this.logger.log(`Fetching client with ID: ${id}`);
    const client = this.clientRepository.findOneBy({id});
    if (!client) {
      this.logger.warn(`Client with ID ${id} not found`);
    }
    return client

  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    this.logger.log(`Updating client with ID: ${id} with: ${JSON.stringify(updateClientDto)}`);
    const client = await this.findOne(id);
    if(!client){
      this.logger.error(`Client with ID: ${id} not found for update`);
      throw new NotFoundException('Client not found');
    }
    Object.assign(client, updateClientDto)
    return this.clientRepository.save(client);
  }

  async remove(id: number) {
    this.logger.log(`Removing client with ID: ${id}`);
    const client = await this.findOne(id);
    if(!client){
      this.logger.error(`Client with ID: ${id} not found`);
      throw new NotFoundException('Client not found');
    }
     await this.clientRepository.remove(client)
     this.logger.log(`Client with ID: ${id} with success`);
  }
}
