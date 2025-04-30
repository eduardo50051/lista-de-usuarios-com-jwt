import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class AtualizarUsuarioDto {
  @IsEmail()               
  @IsOptional()             
  email?: string;

  @MinLength(6)           
  @IsOptional()             
  senha?: string;

  @IsOptional()             
  nome?: string;
}
