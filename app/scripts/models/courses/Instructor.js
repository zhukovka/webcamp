define(['jquery', 'underscore', 'backbone',
	'models/courses/Course', 'backbone-relational'], 
	function ($, _, Backbone, CourseModel) {
		return Backbone.RelationalModel.extend({
			idAttribute: '_id',
			urlRoot: '/courses/instructors',
			relations: [{
				type: 'HasMany',
				key: 'courses',
				includeInJSON: true,
				relatedModel: CourseModel,
				reverseRelation: {
					key: 'withInstructor'
				}
			}]
		});
});