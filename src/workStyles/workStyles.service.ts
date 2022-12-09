import WorkStyleModel from './workStyle.model';
import { CreateWorkStyleDto } from './dto/createWorkStyle.dto';
import { UpdateWorkStyleDto } from './dto/updateWorkStyle.dto';
import { WorkStyle } from './workStyle.interface';
import moment from 'moment';
import { User } from '../users/user.interface';

export class WorkStylesService {
    private workStyleModel = WorkStyleModel;

    public async findWorkStyleById(id: string): Promise<WorkStyle | null> {
        return await this.workStyleModel.findById(id)
            .populate('owner', '-password -createdAt');
    }

    public async findAllWorkStyles(): Promise<WorkStyle[]> {
        return await this.workStyleModel.find({})
            .populate('owner', '-password -createdAt');
    }

    public async createWorkStyle(workStyle: CreateWorkStyleDto, owner: User): Promise<WorkStyle> {
        const newWorkStyle = await this.workStyleModel.create({
            ...workStyle,
            owner,
            createdAt: moment().locale('uz-latn').format('LLLL')
        });
        await newWorkStyle.save();
        await newWorkStyle.populate('owner', '-password -createdAt');
        return newWorkStyle;
    }

    public async deleteWorkStyle(id: string): Promise<WorkStyle | null> {
        return await this.workStyleModel.findByIdAndDelete(id)
            .populate('owner', '-password -createdAt');
    }

    public async updateWorkStyle(id: string, workStyle: UpdateWorkStyleDto): Promise<WorkStyle | null> {
        return await this.workStyleModel.findByIdAndUpdate(
            id,
            {
                ...workStyle,
                updatedAt: moment().locale('uz-latn').format('LLLL')
            }
        )
            .populate('owner', '-password -createdAt');
    }

    public async findWorkStyleByName(name: string): Promise<WorkStyle | null> {
        return await this.workStyleModel.findOne({ name });
    }
}