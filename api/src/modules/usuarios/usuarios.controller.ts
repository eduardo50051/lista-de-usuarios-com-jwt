import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CriarUsuarioDto } from 'src/dto/criar-usuario.dto';
import { AtualizarUsuarioDto } from 'src/dto/atualizar-usuario.dto';
import { AuthGuard } from '@nestjs/passport';
import { Usuario } from '@prisma/client';

@Controller('usuarios')
export class UsuariosController {

    constructor(private usuarioService: UsuariosService){}

    @Post()
    async criarUsuario(@Body() criarUsuarioDto: CriarUsuarioDto){
        return this.usuarioService.criarUsuario(criarUsuarioDto);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    listarUsuarios(): Promise<Usuario[]>{
        return this.usuarioService.listarUsuarios();
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'))
    async listarUsuarioPorId(@Param('id') id: string): Promise<Usuario | null> {
        return this.usuarioService.listarUsuarioPorId({ id: Number(id)});
    }

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'))
    async atualizar(@Param('id') id:string, @Body() atualizarUsuarioDto: AtualizarUsuarioDto){
        return this.usuarioService.atualizarUsuario({
            where: {id: Number(id) },
            data: atualizarUsuarioDto
        })
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    async deletarUsuario(@Param('id') id: number): Promise<Usuario>{
        return this.usuarioService.deletarUsuario({id});
    }

}
