import RegionModel from './region.model';
import { CreateRegionDto } from './dto/createRegion.dto';
import { UpdateRegionDto } from './dto/updateRegion.dto';
import { Region } from './region.interface';
import moment from 'moment';
import { User } from '../users/user.interface';

export class RegionsService {
    private regionModel = RegionModel;

    public async findRegionById(id: string): Promise<Region | null> {
        return await this.regionModel.findById(id)
            .populate('owner', '-password');
    }

    public async findAllRegions(): Promise<Region[]> {
        return await this.regionModel.find({})
            .populate('owner', '-password');
    }

    public async createRegion(region: CreateRegionDto, owner: User): Promise<Region> {
        const newRegion = await this.regionModel.create({
            ...region,
            owner,
            createdAt: moment().locale('uz-latn').format('LLLL')
        });
        await newRegion.save();
        await newRegion.populate('owner', '-password');
        return newRegion;
    }

    public async deleteRegion(id: string): Promise<Region | null> {
        return await this.regionModel.findByIdAndDelete(id)
            .populate('owner', '-password');
    }

    public async updateRegion(id: string, region: UpdateRegionDto): Promise<Region | null> {
        return await this.regionModel.findByIdAndUpdate(
            id,
            {
                ...region,
                updatedAt: moment().locale('uz-latn').format('LLLL')
            }
        )
            .populate('owner', '-password');
    }

    public async findRegionByName(name: string): Promise<Region | null> {
        return await this.regionModel.findOne({ name });
    }
}