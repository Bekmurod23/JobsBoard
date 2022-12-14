import { Schema, model } from 'mongoose';
import { Order } from './order.interface';
import { Conditions } from '../utils/enums/condition.enum';

const ProjectSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        deadline: {
            type: Date,
            required: true
        },
        comments: {
            type: String
        },
        attachedFile: {
            type: String,
            required: true
        }
    }
);

const Requirements = new Schema(
    {
        transactionType: {
            type: String
        },
        requirementsToTheExecutor: {
            type: String
        },
        comments: {
            type: String
        }
    }
);

const ContactsSchema = new Schema(
    {
        customerWebsite: {
            type: String
        },
        customerEmail: {
            type: String,
            required: true
        },
        customerAddress: {
            type: String,
            required: true
        },
        customerPhoneNumber: {
            type: String,
            required: true
        },
        customerAddPhoneNumber: {
            type: String
        },
        contactPerson: {
            type: String
        },
        personEmail: {
            type: String,
            required: true
        },
        personAddress: {
            type: String,
            required: true
        },
        personPhoneNumber: {
            type: String,
            required: true
        },
        personAddPhoneNumber: {
            type: String
        }
    }
);

const OrderSchema = new Schema(
    {
        customer: {
            type: String,
            required: true
        },
        customerType: {
            type: String,
            required: true
        },
        applicationsOpen: {
            type: Date,
            required: true
        },
        applicationsClose: {
            type: Date,
            required: true
        },
        minBudget: {
            type: Number
        },
        maxBudget: {
            type: Number
        },
        currency: {
            type: String,
            required: true
        },
        negotiable: {
            type: String
        },
        filingConditions: {
            type: String,
            required: true
        },
        specializations: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Specialization',
                required: true
            }
        ],
        project: ProjectSchema,
        requirements: Requirements,
        contacts: ContactsSchema,
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        condition: {
            type: String,
            enum: Conditions,
            default: Conditions.PRIVATE,
            required: true
        },
        createdAt: {
            type: String
        },
        updatedAt: {
            type: String
        }
    },
    {
        toJSON: { virtuals: true }
    }
);

OrderSchema.virtual('status').get(function () {
    if (new Date(`${this.applicationsClose}`).getTime() > new Date().getTime()) {
        return 'open';
    } else if (new Date(`${this.applicationsClose}`).getTime() < new Date().getTime()) {
        return 'closed';
    }
})

OrderSchema.virtual('archived').get(function () {
    if (new Date(`${this.applicationsClose}`).getTime() > new Date().getTime()) {
        return false;
    } else if (new Date(`${this.applicationsClose}`).getTime() < new Date().getTime()) {
        return true;
    }
})

const OrderModel = model<Order>('Order', OrderSchema);

export default OrderModel;