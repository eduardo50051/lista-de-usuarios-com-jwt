import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CriarUsuarioDto {
  @IsEmail()               
  email: string;

  @IsNotEmpty()            
  @MinLength(6)            
  senha: string;

  @IsOptional()           
  nome?: string;
}
