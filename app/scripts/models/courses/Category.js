define(['jquery', 'underscore', 'backbone',
	'models/courses/Course', 'backbone-relational'], 
	function ($, _, Backbone, CourseModel) {
		return Backbone.RelationalModel.extend({
			idAttribute: '_id',
			relations: [{
				type: 'HasMany',
				key: 'courses',
				includeInJSON: true,
				relatedModel: CourseModel,
				reverseRelation: {
					key: 'inCategory'
				}
			}]
			// relation:[{
			// 	type: Backbone.HasMany,
			// 	key:'courses',
			// 	relatedModel: CourseModel,
			// 	// includeInJSON: true,
			// 	collectionType: CoursesCollection,
			// 	reverseRelation:{
			// 		key:'inCategory',
			// 		// includeInJSON: '_id'
			// 	}
			// }]
		});
});