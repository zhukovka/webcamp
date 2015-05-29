define(['jquery', 'underscore', 'backbone',
    'models/courses/Course',
    'collections/Instructors',
	'collections/Reviews',
    'views/courses/CoursesLayoutView',
	'views/courses/FullCategoriesLayoutView',
	'views/courses/CategoryDetailsView',
    'views/courses/CourseView',
    'views/courses/SchedulesLayoutView',
    'views/instructors/InstructorsView',
	'views/reviews/ReviewsView',
    ], 
	function ($, _, Backbone, CourseModel, 
        InstructorsCollection, Reviews,
		CoursesLayoutView, FullCategoriesLayoutView,
		CategoryDetailsView, CourseView, SchedulesLayoutView, 
        InstructorsView, ReviewsView) {
	return {
		showHome: function(self){
            var coursesLayoutView = new CoursesLayoutView({collection:self.collection});
            self.changeView(coursesLayoutView);
            // this.showNavbar();
            // console.log(self.collection.at(0).get('courses').at(0), '<<<<<<');
            coursesLayoutView.addKwicks();
            // console.log("Show Home");
        },
		showCategory: function (self, title) {
            // console.log(this.collection.findWhere({title:title}), 'find where html');
            // body...
            var category = self.collection.findWhere({title:title}).get('courses');
            var categoryDetailsView = new CategoryDetailsView({collection:category});
            // console.log(categoryDetailsView, 'categoryDetailsView');
            
            self.changeView(categoryDetailsView);
            // categoryDetailsView.showToolTips();
        },
        showCourseDetails:function (self, title, course) {
            var category = self.collection.findWhere({title:title});
            var courseTitle = course.replace('-',' ');
            var courseModel = category.get('courses').findWhere({title:courseTitle});
            courseModel.set('more', true);
            // courseModel.fetch();
            var courseView = new CourseView({model:courseModel});
            
            self.changeView(courseView);
        },
        showAllCourses: function (self) {
            var fullCategoriesLayoutView = new FullCategoriesLayoutView(
                {collection: self.collection, className:'details-container'});
            // console.log(fullCategoriesLayoutView);
            // 
            self.changeView(fullCategoriesLayoutView);
        },
        showSсhedule: function (self) {

            // console.log(self.collection);
            var schedulesLayoutView = new SchedulesLayoutView(
                {collection: self.collection, className:'details-container'});
            // 
            self.changeView(schedulesLayoutView);
        },
        showInsrtuctors: function (self) {
            var instructors = new InstructorsCollection();
            instructors.fetch({reset:true});
            delete IN;
            $.getScript("http://platform.linkedin.com/in.js");
            var instructorsView = new InstructorsView({
                collection: instructors
            });
            self.changeView(instructorsView);
            // $('body').append('<script src="//platform.linkedin.com/in.js" type="text/javascript"></script>');
        },
        showReviews: function (self) {
            FB.api(
                "/217557725110551/ratings?access_token=CAAMppa2FKP4BAGQucHlc2RpYnNbRM06l5W3hHwhLMTNZAaSgdhqZBryzcZAvm9s7VcVD7ZA4tvRsqNGSPQEgbVQdht7m8jKRB6pVavuDWgnW0qtZAsVocw9tWIsi1l4dMgtLenWmDSK4NSJoCYv5DF67ZCbWPhUGJVELo7tzbCf1A2JmzWHhLllLdZBR7fQQVIZD",
                function (response) {
                  if (response && !response.error) {
                        var reviews = new Reviews(response.data);
                        var reviewsView = new ReviewsView({collection:reviews});
                        self.changeView(reviewsView);
                  }
                  else{
                    console.dir(response.error);
                  }
                });
        }
	};
});