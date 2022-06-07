import { Expose } from 'class-transformer';

export class TestResDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    address: string;

}
