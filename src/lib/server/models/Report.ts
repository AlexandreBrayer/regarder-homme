import { Schema, model } from 'mongoose';

const ReportModel = new Schema<IReport>({
	process: {
		type: Schema.Types.ObjectId || null,
		required: true,
		ref: 'Process'
	},
	log: {
		type: Object,
		required: false
	},
	productsFound: {
		type: Number,
		required: false
	}
}).set('timestamps', true);

export default model('Report', ReportModel);
