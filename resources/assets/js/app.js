Vue.filter('formatDate', function(value){
	return moment(value, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
});
Vue.filter('formatBirthDate', function(value){
	return moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY');
});

$(".close-alert").click(function(ev){
	ev.preventDefault();
    $(".alert").alert('hide');
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
			password_confirmation: '',
			new_password: '',
			new_password_confirmation: ''
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
			saveAction: 'insert',
			isDatabasePassword: false
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
			var url = window.location.pathname+'api/user';

			self.$http.get(url).then(function (response) {
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

			Vue.set(self.pagination, 'perPage', '5');
			self.setPaginationData(self.users.all);
			Vue.set(self.interaction, 'sortColumn', 'email');
			Vue.set(self.interaction, 'sortReverse', 1);
			Vue.set(self.interaction, 'filterTerm', '');
			Vue.set(self.interaction, 'columnsToFilter', []);
			Vue.set(self.interaction, 'visibleColumns', ['email', 'first_name','last_name', 'updated_at']);
			Vue.set(self.interaction, 'isDatabasePassword', false);

			self.controls.select2.val('').trigger('change');
		},

		new: function(){
			var self = this;
			jQuery('#errors').empty();
			self.user.id = '';
			self.user.email = '';
			self.user.first_name = '';
			self.user.last_name = '';
			self.user.mobile = '';
			self.user.birth_date = '';
			self.user.password = '';
			self.user.password_confirmation = '';
			jQuery(self.$els.modal).modal('show');
			Vue.set(self.interaction, 'saveAction', 'insert');
		},

		save: function(ev){
			ev.preventDefault();
			var self = this;
			var url = window.location.href+'api/user';
			var data = {
				'email': self.user.email,
				'first_name': self.user.first_name,
				'last_name': self.user.last_name,
				'mobile': self.user.mobile,
				'birth_date': self.user.birth_date,
				'password': self.user.password,
				'password_confirmation': self.user.password_confirmation,
			};

				self.$http.post(url, data).then(function (response) {
		        	jQuery(self.$els.modal).modal('hide');
		        	self.load();
		        	self.doResetAll();
					jQuery('#success').html('<div class="alert alert-success fade in"><button class="close alert-close" data-dismiss="alert">&times;</button>Usuário salvo com sucesso.</div>');		      	
				}, function (response){		      		
		      		var errors = '';
		      		_.forEach(response.data, function(value, key) {
					  	errors += '<p>'+value+'</p>';
					});
		      		$('#errors').html('<div class="alert alert-danger fade in">'+errors+'</div>');
		      	});
		},

		edit: function (ev, user){
			ev.preventDefault();
			var self = this;

			Vue.set(self.interaction, 'saveAction', 'update');
			jQuery('#errors').empty();
			this.user.id = user.id;
            this.user.email = user.email;
            this.user.first_name = user.first_name;
            this.user.last_name = user.last_name;
            this.user.mobile = user.mobile;
            this.user.birth_date = moment(user.birth_date,'YYYY-MM-DD').format('DD/MM/YYYY');
            this.user.password = user.password;
			jQuery(self.$els.modal).modal('show');
		},

		update: function (ev){
			ev.preventDefault();
			var self = this;
			var url = window.location.href+'api/user/'+self.user.id;
			var data = {
				'email': self.user.email,
				'first_name': self.user.first_name,
				'last_name': self.user.last_name,
				'mobile': self.user.mobile,
				'birth_date': self.user.birth_date,
			};

			Vue.http.options.emulateJSON = true;
			self.$http.put(url, data).then(function (response) {
	        	jQuery(self.$els.modal).modal('hide');
	        	self.load();
	        	self.doResetAll();
	        	jQuery('#success').html('<div class="alert alert-success fade in"><button class="close" data-dismiss="alert">&times;</button>Dados do Usuário salvos com sucesso.</div>');
	      	}, function (response){
	      		var errors = '';
	      		console.log(response.data);
	      		_.forEach(response.data, function(value, key) {
				  	errors += '<p>'+value+'</p>';
				});
		      	$('#errors').html('<div class="alert alert-danger fade in" role="alert">'+errors+'</div>');	      	
		    });			
		},

		remove: function (ev, id){
			ev.preventDefault();
			var self = this;
			var url = window.location.href+'api/user/'+id;

			Vue.http.options.emulateJSON = true;
			if(confirm('Deseja deletar o usuario?')){
				self.$http.delete(url).then(function (response) {
		        	self.load();
		        	self.doResetAll();
					jQuery('#success').html('<div class="alert alert-success fade in"><button class="close" data-dismiss="alert">&times;</button>Usuário removido com sucesso.</div>');		      	
				});			
			}
		},

		changePassword: function(ev, user){
			ev.preventDefault();
			var self = this;

			jQuery('#changepw_errors').empty();
			this.user.email = user.email;
			this.user.id = user.id;
			this.user.passwordEdit = '';
			this.user.password = '';
			jQuery(this.$els.formChangePw)[0].reset();
			jQuery(self.$els.modalChangePw).modal('show');
		},

		saveChangePw: function(ev){
			ev.preventDefault();
			var self = this;

			var url = window.location.href+'api/user/'+self.user.id+'/changepw';
			var data = { 
					'password': self.user.password, 
					'new_password': self.user.new_password, 
					'new_password_confirmation': self.user.new_password_confirmation
			};

				self.$http.put(url, data).then(function (response) {
		        	jQuery(self.$els.modalChangePw).modal('hide');
		        	self.load();
		        	self.doResetAll();
					jQuery('#success').html('<div class="alert alert-success fade in"><button class="close" data-dismiss="alert">&times;</button>Senha modificada com sucesso.</div>');
		      	}, function (response){
		      		console.log(response.data);
		      		var errors = '';
		      		_.forEach(response.data, function(value, key) {
					  	errors += '<p>'+value+'</p>';
					});
		      		$('#changepw_errors').html('<div class="alert alert-danger fade in" role="alert">'+errors+'</div>');
		      	});						
		}

	}
});