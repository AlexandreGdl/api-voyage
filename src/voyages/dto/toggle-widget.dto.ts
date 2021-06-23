import {IsMongoId, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ToggleWidgetDto{
  @IsMongoId()
  @ApiProperty({ required: true })
  readonly voyageId: string;

  @IsMongoId()
  @ApiProperty({ required: true })
  readonly widgetId: string;
}