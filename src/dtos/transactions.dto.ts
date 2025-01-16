import { IsString, IsNumber, IsOptional, IsDateString, IsEnum, MaxLength } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  public amount: number;

  @IsString()
  @IsEnum(['Food', 'Transportation', 'Utilities', 'Entertainment', 'Salary', 'Other'])
  public category: string;

  @IsString()
  @IsEnum(['income', 'expense'])
  public type: string;

  @IsDateString()
  public date: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  public description?: string;

  @IsOptional()
  @IsString()
  @IsEnum(['pending', 'completed', 'failed'])
  public status?: string;

  @IsOptional()
  @IsString()
  public currency?: string = 'IDR';
}
