Vue.filter('formatDate', function(value){
	return moment(value, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
});
Vue.filter('formatBirthDate', function(value){
	return moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY');
});

new Vue({

	el: '#crud',

	data: {
		user: {
			id: '',
			email: '',
			first_name: '',
			last_name: '',
			mobile: '',
			birth_date: '',
			password: '',
			passwordEdit: ''
		},
		users: {
			list: [],
			all: [],
			paginated: []
		},
		pagination: {
			currentPage: 1,
			totalPages: 0,
			totalItems: 0,
			perPage: 5,
			pageNumbers: []
		},
		interaction: {
			sortColumn: 'email',
			sortReverse: 1,
			filterTerm: '',
			columnsToFilter: [],
			visibleColumns: ['email', 'first_name','last_name', 'updated_at'],
			saveAction: 'insert'
		},
		controls: {
			select2: null
		}
	},

	ready: function(){
		this.load();
	},

	attached: function(){
		jQuery(this.$els.birthDate).mask('00/00/0000');
		var maskBehavior = function (val) {
		  return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
		},
		options = {onKeyPress: function(val, e, field, options) {
		        field.mask(maskBehavior.apply({}, arguments), options);
		    }
		};
		jQuery(this.$els.mobile).mask(maskBehavior, options);
	},

	methods: {

		load: function(){
			var self = this;

			self.$http.get('http://localhost/laravel_vuejs/public/api/user').then(function (response) {
	        	var chunk;
	        	
	        	Vue.set(self.users, 'all', response.data);

	        	self.setPaginationData(self.users.all);

	      	});

			self.controls.select2 = jQuery(self.$els.columnsToFilterSelect).select2({
				placeholder: 'Se desejar selecione uma ou mais colunas para filtrar'
			}).on('change', function(){
				Vue.set(self.interaction, 'columnsToFilter', jQuery(this).val());
			});
		},

		repaginate: function(perPage){
			var self = this;
			Vue.set(this.pagination, 'perPage', perPage);
			self.setPaginationData(self.users.all);
		},

		setPaginationData: function(list){
			var self = this;

        	chunk = _.chunk(list, self.pagination.perPage);
        	Vue.set(self.users, 'paginated', chunk);
        	Vue.set(self.users, 'list', chunk[0]);

			Vue.set(self.pagination, 'currentPage', 1);
        	Vue.set(self.pagination, 'totalItems', list.length);
        	Vue.set(self.pagination, 'totalPages', Math.ceil((list.length / self.pagination.perPage)));
        	Vue.set(self.pagination, 'pageNumbers', _.range(1, self.pagination.totalPages+1));
		},

		page: function(ev, page){
			ev.preventDefault();
			var self = this;

			Vue.set(self.pagination, 'currentPage', page);
			Vue.set(self.users, 'list', self.users.paginated[page-1]);
		},

		next: function(ev){
			ev.preventDefault();
			var self = this;

			if (self.pagination.currentPage == self.pagination.totalPages)
				return false;

			Vue.set(self.pagination, 'currentPage', self.pagination.currentPage+1);
			Vue.set(self.users, 'list', self.users.paginated[self.pagination.currentPage-1]);
		},

		previous: function(ev){
			ev.preventDefault();
			var self = this;

			if (self.pagination.currentPage == 1)
				return false;
			Vue.set(self.pagination, 'currentPage', self.pagination.currentPage-1);
			Vue.set(self.users, 'list', self.users.paginated[self.pagination.currentPage-1]);
		},

		doSort: function(ev, column){
			ev.preventDefault();
			Vue.set(this.interaction,'sortColumn', column);
			Vue.set(this.interaction,'sortReverse', this.interaction.sortReverse * -1);
		},

		doFilter: function(){
			var self = this;

			filtered = self.users.all;

			if (self.interaction.filterTerm != '' && self.interaction.columnsToFilter.length > 0){
				filtered = _.filter(self.users.all, function(user){
					return self.interaction.columnsToFilter.some(function(column){
						return user[column].toLowerCase().indexOf(self.interaction.filterTerm.toLowerCase()) > -1;
					});
				});
			}	

			self.setPaginationData(filtered);
		},

		doResetAll: function(){
			var self = this;

			//Vue.set(self.users, 'list', self.users.all);
			Vue.set(self.pagination, 'perPage', '5');
			self.setPaginationData(self.users.all);
			Vue.set(self.interaction, 'sortColumn', 'email');
			Vue.set(self.interaction, 'sortReverse', 1);
			Vue.set(self.interaction, 'filterTerm', '');
			Vue.set(self.interaction, 'columnsToFilter', []);
			Vue.set(self.interaction, 'visibleColumns', ['email', 'first_name','last_name', 'updated_at']);

			self.controls.select2.val('').trigger('change');
		},

		new: function(){
			var self = this;
			jQuery(self.$els.modal).on('hidden.bs.modal', function() {
			    $(self.$els.form).validate().resetForm();
			    $('.has-error').removeClass('has-error');
			    $('.has-feedback').removeClass('has-feedback');
			});
			self.user.id = '';
			self.user.email = '';
			self.user.first_name = '';
			self.user.last_name = '';
			self.user.mobile = '';
			self.user.birth_date = '';
			self.user.password = '';
			jQuery(self.$els.modal).modal('show');
			Vue.set(self.interaction, 'saveAction', 'insert');
		},

		save: function(ev){
			ev.preventDefault();
			var self = this;
			self.validate(this.$els.form);
			var valid = jQuery(this.$els.form).valid();
			self.user.birth_date = moment(self.user.birth_date,'DD/MM/YYYY').format('YYYY-MM-DD');
			if (valid){
				self.$http.post('http://localhost/laravel_vuejs/public/api/user', self.user).then(function (response) {
		        	jQuery(self.$els.modal).modal('hide');
		        	self.load();
		        	self.doResetAll();
		      	});
			}
		},

		edit: function (ev, user){
			ev.preventDefault();
			var self = this;

			Vue.set(self.interaction, 'saveAction', 'update');
			this.user.id = user.id;
            this.user.email = user.email;
            this.user.first_name = user.first_name;
            this.user.last_name = user.last_name;
            this.user.mobile = user.mobile;
            this.user.birth_date = user.birth_date;
            this.user.password = user.password;
			jQuery(self.$els.modal).modal('show');
		},

		update: function (ev){
			ev.preventDefault();
			var self = this;
			Vue.http.options.emulateJSON = true;
			self.validate(this.$els.form);
			var valid = jQuery(this.$els.form).valid();
			self.user.birth_date = moment(self.user.birth_date,'DD/MM/YYYY').format('YYYY-MM-DD');
			if (valid){			
				self.$http.put('http://localhost/laravel_vuejs/public/api/user/'+self.user.id, self.user).then(function (response) {
		        	jQuery(self.$els.modal).modal('hide');
		        	self.load();
		        	self.doResetAll();
		      	});			
			}
		},

		remove: function (ev, id){
			ev.preventDefault();
			var self = this;

			Vue.http.options.emulateJSON = true;
			if(confirm('Deseja deletar o usuario?')){
				self.$http.delete('http://localhost/laravel_vuejs/public/api/user/'+id).then(function (response) {
		        	alert('Usuário removido com sucesso!');
		        	self.load();
		        	self.doResetAll();
		      	});			
			}
		},

		validate: function(form){
			jQuery(form).validate({
				lang: 'pt_BR',
		        rules: {
		            email: {
						minlength: 3,
		                maxlength: 15,
		                required: true,
		                email: true
		            },
					first_name: {
						minlength: 3,
		                maxlength: 15,
		                required: true
					},
					last_name: {
						minlength: 3,
		                maxlength: 15,
		                required: true
					},
					mobile: {
						minlength: 3,
		                maxlength: 15,
		                required: true
					},
					birth_date: {
						minlength: 3,
		                maxlength: 15,
		                required: true
					},
					password: {
						minlength: 3,
		                maxlength: 15,
		                required: true
					},
					password_confirm: {
						minlength: 3,
		                maxlength: 15,
		                required: true,
				      	equalTo: "#password"
				    }
		        },
		        highlight: function(element) {
		            $(element).closest('.form-group').addClass('has-error');
		        },
		        unhighlight: function(element) {
		            $(element).closest('.form-group').removeClass('has-error');
		        },
		        errorElement: 'span',
		        errorClass: 'help-block',
		        errorPlacement: function(error, element) {
		            if(element.parent('.input-group').length) {
		                error.insertAfter(element.parent());
		            } else {
		                error.insertAfter(element);
		            }
		        }
		    });
		},

		changePassword: function(ev, user){
			ev.preventDefault();
			var self = this;

			jQuery(self.$els.modalChangePw).on('hidden.bs.modal', function() {
			    $(self.$els.formChangePw).validate().resetForm();
			    $('.has-error').removeClass('has-error');
			    $('.has-feedback').removeClass('has-feedback');
			});

			this.user.email = user.email;
			this.user.id = user.id;
			this.user.password = '';
			this.user.passwordEdit = '';
			jQuery(self.$els.modalChangePw).modal('show');
		},

		validateChangePw: function(form){
			var self = this;
			var id = self.user.id;
			var password = self.user.passwordEdit;
			var url = 'http://localhost/laravel_vuejs/public/api/user/'+id+'/'+password;
			
			jQuery(form).validate({
				lang: 'pt_BR',
		        rules: {
					password_new: {
						minlength: 3,
		                maxlength: 15,
		                required: true,
					},
					password_confirm: {
						minlength: 3,
		                maxlength: 15,
		                required: true,
				      	equalTo: "#password_new"
				    },
					password: {
						minlength: 3,
		                maxlength: 15,
		                required: true,
		                remote: {
		                	url: url
		                }
					},
		        },
		        messages: {
			        password: {
			            remote: "Senha incorreta!"
			        }
			    },
		        highlight: function(element) {
		            $(element).closest('.form-group').addClass('has-error');
		        },
		        unhighlight: function(element) {
		            $(element).closest('.form-group').removeClass('has-error');
		        },
		        errorElement: 'span',
		        errorClass: 'help-block',
		        errorPlacement: function(error, element) {
		            if(element.parent('.input-group').length) {
		                error.insertAfter(element.parent());
		            } else {
		                error.insertAfter(element);
		            }
		        }
		    });
		},

		saveChangePw: function(ev){
			ev.preventDefault();
			var self = this;
			self.validateChangePw(this.$els.formChangePw);
			var valid = jQuery(this.$els.formChangePw).valid();

			if (valid){			
				self.$http.put('http://localhost/laravel_vuejs/public/api/user/'+self.user.id, {'password': self.user.passwordEdit}).then(function (response) {
		        	jQuery(self.$els.modalChangePw).modal('hide');
		        	self.load();
		        	self.doResetAll();
		      	});			
			}
		}
	}
});