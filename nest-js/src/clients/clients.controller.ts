import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody, 
  ApiParam,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger';

@ApiTags('Clientes')
@Controller('Clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo cliente' })
  @ApiCreatedResponse({ 
    description: 'Cliente criado com sucesso',
    type: CreateClientDto
  })
  @ApiBody({ type: CreateClientDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os clientes' })
  @ApiOkResponse({ 
    description: 'Lista de clientes retornada com sucesso',
    isArray: true,
    type: CreateClientDto
  })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém um cliente específico' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do cliente' })
  @ApiOkResponse({ 
    description: 'Cliente encontrado',
    type: CreateClientDto
  })
  @ApiNotFoundResponse({ description: 'Cliente não encontrado' })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um cliente' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do cliente' })
  @ApiBody({ type: UpdateClientDto })
  @ApiOkResponse({ 
    description: 'Cliente atualizado com sucesso',
    type: UpdateClientDto
  })
  @ApiNotFoundResponse({ description: 'Cliente não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um cliente' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do cliente' })
  @ApiOkResponse({ description: 'Cliente removido com sucesso' })
  @ApiNotFoundResponse({ description: 'Cliente não encontrado' })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}