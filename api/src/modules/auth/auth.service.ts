import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginDto } from 'src/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(private usuarioService: UsuariosService, private jwtService: JwtService) {}

    async login(loginDto: LoginDto){
        const usuario = await this.usuarioService.listarUsuarioPorId({email: loginDto.email});

        if(!usuario) {
            throw new UnauthorizedException('Usuario ou senha incorretos')
        }

        const senhaCerta = await bcrypt.compare(loginDto.senha, usuario.senha);
        if (!senhaCerta) {
            throw new UnauthorizedException('Usuario ou senha incorretos');
        }

        const payload= {sub: usuario.id, email: usuario.email};

        const token = this.jwtService.sign(payload);

       const dados_login = {
            access_token: token,
            usuario: {
              id: usuario.id,
              email: usuario.email,
              nome: usuario.nome,
            },
        };

        console.log('usuario logado:', dados_login);

        return dados_login;

    }

}
