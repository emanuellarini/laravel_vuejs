<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8">
        <title>Laravel</title>

        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
        <link href="{!! asset('css/app.css') !!}" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div class="container" id="crud">

            <div class="page-header text-center">
                <h1>SPA - GERENCIAMENTO DE USUÁRIOS</h1>
            </div>
            <div class="row">
                <div id="success" class="bs-example"></div>
            </div>
            <form id="form" v-el:form>
                <div v-el:modal class="modal fade" tabindex="-1" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title">Gerenciamento de Usuário</h4>
                            </div>
                            <div class="modal-body">
                                <div id="errors" class="bs-example"></div>
                                <input v-if="interaction.saveAction == 'update'" type="hidden" v-model="user.id" class="form-control" name="id" id="id">
                                <div class="form-group">
                                    <label for="email" class="control-label">E-mail:</label>
                                    <input type="text" v-model="user.email" class="form-control" name="email" id="email">
                                </div>
                                <div class="form-group">
                                    <label for="first_name" class="control-label">Nome:</label>
                                    <input type="text" v-model="user.first_name" class="form-control" name="first_name" id="first_name">
                                </div>
                                <div class="form-group">
                                    <label for="last_name" class="control-label">Sobrenome:</label>
                                    <input type="text" v-model="user.last_name" class="form-control" name="last_name" id="last_name">
                                </div>
                                <div class="form-group">
                                    <label for="mobile" class="control-label">Telefone:</label>
                                    <input type="text" v-el:mobile v-model="user.mobile" class="form-control" name="mobile" id="mobile">
                                </div>
                                <div class="form-group">
                                    <label for="birth_date" class="control-label">Data de Nascimento:</label>
                                    <input type="text" v-el:birth-date v-model="user.birth_date" class="form-control" name="birth_date" id="birth_date">
                                </div>
                                <div class="form-group" v-if="interaction.saveAction == 'insert'">
                                    <label for="password" class="control-label">Senha:</label>
                                    <input type="password" v-model="user.password" class="form-control" name="password" id="password">
                                </div>
                                <div class="form-group" v-if="interaction.saveAction == 'insert'">
                                    <label for="password_confirmation" class="control-label">Confirmar Senha:</label>
                                    <input type="password" v-model="user.password_confirmation" class="form-control" name="password_confirmation" id="password_confirmation">
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                                    <template v-if="interaction.saveAction == 'insert'" >
                                        <button type="button" v-on:click="save" class="btn btn-primary">Salvar</button>
                                    </template>
                                    <template v-if="interaction.saveAction == 'update'" >
                                    <button type="button" v-on:click="update" class="btn btn-primary">Salvar</button>
                                    </template>
                            </div>

                        </div><!-- /.modal-content -->
                    </div><!-- /.modal-dialog -->
                </div><!-- /.modal -->
            </form>

            <form id="form_changepw" v-el:form-change-pw>
                <div v-el:modal-change-pw class="modal fade" tabindex="-1" role="dialog">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Mudança de senha</h4>
                      </div>
                      <div class="modal-body">
                            <div id="changepw_errors" class="bs-example"></div>
                            <input type="hidden" v-model="user.id" class="form-control" name="id" id="user_id">
                            <div class="form-group">
                                <label for="email" class="control-label">Email</label>
                                <p type="text" class="well well-sm" name="email" id="email">@{{ user.email }}</p>
                            </div>
                            <div class="form-group">
                                <label for="password" class="control-label">Digite sua Senha:</label>
                                <input type="password" v-model="user.password" class="form-control" name="password" id="password">
                            </div>
                            <div class="form-group">
                                <label for="new_password" class="control-label">Digite uma Nova Senha</label>
                                <input type="password" v-model="user.new_password" class="form-control" name="new_password" id="new_password">
                            </div>
                            <div class="form-group">
                                <label for="new_password_confirmation" class="control-label">Repita a Senha:</label>
                                <input type="password" v-model="user.new_password_confirmation" class="form-control" name="new_password_confirmation" id="new_password_confirmation">
                            </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" v-on:click="saveChangePw($event)" class="btn btn-primary">Salvar</button>
                      </div>
                    </div><!-- /.modal-content -->
                  </div><!-- /.modal-dialog -->
                </div><!-- /.modal-changepw -->
            </form>

            <div class="row">
                <div class="col-md-2">
                    <div class="well">
                        <label class="text-sm">Colunas Visíveis</label>
                        <select v-model="interaction.visibleColumns" multiple class="form-control">
                            <option value="email">E-mail</option>
                            <option value="first_name">Nome</option>
                            <option value="last_name">Sobrenome</option>
                            <option value="mobile">Telefone</option>
                            <option value="birth_date">Data de Nascimento</option>
                            <option value="updated_at">Atualizado em</option>
                        </select>
                    </div>
                    <div class="well">
                        <label>Quantidade por Página</label>
                        <select v-model="pagination.perPage" v-on:change="repaginate(pagination.perPage)" class="form-control">
                            <option class="text-small" value="5" selected>5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <div class="well">
                        <button v-on:click="doResetAll" class="btn btn-default btn-block">Reset Geral</button>
                    </div>
                    <div class="well">
                        <button v-on:click="new" class="btn btn-primary btn-block">Novo Usuário</button>
                    </div>
                </div>
                <div class="col-md-10">
                    <div class="well">
                        <div class="row">
                            <div class="col-md-6">
                                <select v-el:columns-to-filter-select multiple v-model="interaction.columnsToFilter" class="form-control">
                                    <option value="email">E-mail</option>
                                    <option value="first_name">Nome</option>
                                    <option value="last_name">Sobrenome</option>
                                    <option value="mobile">Telefone</option>
                                    <option value="birth_date">Data de Nascimento</option>
                                    <option value="updated_at">Atualizado em</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <input v-on:keyup="doFilter" v-model="interaction.filterTerm" type="text" class="form-control" placeholder="Digite as palavras a serem pesquisadas"/>
                            </div>
                        </div>

                    </div>

                    <table class="table table-bordered table-hover table-striped">

                        <thead>
                            <tr>
                                <th v-show="interaction.visibleColumns.indexOf('email') > -1">
                                    <i class="fa fa-fw fa-sort"
                                        v-bind:class="{
                                            'fa-sort-amount-asc': interaction.sortColumn == 'email' && interaction.sortReverse == 1,
                                            'fa-sort-amount-desc': interaction.sortColumn == 'email' && interaction.sortReverse == -1
                                            }"
                                    ></i>
                                    <a href="#" v-on:click="doSort($event, 'email')" >E-mail</a>
                                </th>

                                <th v-show="interaction.visibleColumns.indexOf('first_name') > -1">
                                    <i class="fa fa-fw fa-sort"
                                        v-bind:class="{
                                            'fa-sort-amount-asc': interaction.sortColumn == 'first_name' && interaction.sortReverse == 1,
                                            'fa-sort-amount-desc': interaction.sortColumn == 'first_name' && interaction.sortReverse == -1
                                            }"
                                    ></i>
                                    <a href="#" v-on:click="doSort($event, 'first_name')">Nome</a>
                                </th>

                                <th v-show="interaction.visibleColumns.indexOf('last_name') > -1">
                                    <i class="fa fa-fw fa-sort"
                                        v-bind:class="{
                                            'fa-sort-amount-asc': interaction.sortColumn == 'last_name' && interaction.sortReverse == 1,
                                            'fa-sort-amount-desc': interaction.sortColumn == 'last_name' && interaction.sortReverse == -1
                                            }"
                                    ></i>
                                    <a href="#" v-on:click="doSort($event, 'last_name')">Sobrenome</a>
                                </th>

                                <th v-show="interaction.visibleColumns.indexOf('mobile') > -1">
                                    <i class="fa fa-fw fa-sort"
                                        v-bind:class="{
                                            'fa-sort-amount-asc': interaction.sortColumn == 'mobile' && interaction.sortReverse == 1,
                                            'fa-sort-amount-desc': interaction.sortColumn == 'mobile' && interaction.sortReverse == -1
                                            }"
                                    ></i>
                                    <a href="#" v-on:click="doSort($event, 'mobile')">Telefone</a>
                                </th>

                                <th v-show="interaction.visibleColumns.indexOf('birth_date') > -1">
                                    <i class="fa fa-fw fa-sort"
                                        v-bind:class="{
                                            'fa-sort-amount-asc': interaction.sortColumn == 'birth_date' && interaction.sortReverse == 1,
                                            'fa-sort-amount-desc': interaction.sortColumn == 'birth_date' && interaction.sortReverse == -1
                                            }"
                                    ></i>
                                    <a href="#" v-on:click="doSort($event, 'birth_date')">Data de Nascimento</a>
                                </th>

                                <th v-show="interaction.visibleColumns.indexOf('updated_at') > -1">
                                    <i class="fa fa-fw fa-sort"
                                        v-bind:class="{
                                            'fa-sort-amount-asc':interaction.sortColumn == 'updated_at' && interaction.sortReverse == 1,
                                            'fa-sort-amount-desc': interaction.sortColumn == 'updated_at' && interaction.sortReverse == -1
                                            }"
                                    ></i>
                                    <a href="#" v-on:click="doSort($event, 'updated_at')">Atualizado em</a>
                                </th>
                                <th colspan="3" width="1%">
                                        <i class="fa fa-fw fa-th-large"></i><b class="text-primary" style="text-align:center;">Ações</b>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users.list | orderBy interaction.sortColumn interaction.sortReverse">
                                <td v-show="interaction.visibleColumns.indexOf('email') > -1">@{{ user.email }}</td>
                                <td v-show="interaction.visibleColumns.indexOf('first_name') > -1">@{{ user.first_name }}</td>
                                <td v-show="interaction.visibleColumns.indexOf('last_name') > -1">@{{ user.last_name }}</td>
                                <td v-show="interaction.visibleColumns.indexOf('birth_date') > -1">@{{ user.birth_date | formatBirthDate }}</td>
                                <td v-show="interaction.visibleColumns.indexOf('mobile') > -1">@{{ user.mobile }}</td>
                                <td v-show="interaction.visibleColumns.indexOf('updated_at') > -1">@{{ user.updated_at | formatDate }}</td>
                                <td width="1%" nowrap>
                                    <a href="#" v-on:click="edit($event, user)">
                                        <i class="fa fa-fw fa-edit"></i>
                                    </a>
                                </td>
                                <td width="1%" nowrap>
                                    <a href="#" v-on:click="remove($event, user.id)">
                                        <i class="fa fa-fw fa-trash-o"></i>
                                    </a>
                                </td>
                                <td width="1%" nowrap>
                                    <a href="#" v-on:click="changePassword($event, user)">
                                        <i class="fa fa-fw fa-key"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <nav class="text-center">
                      <ul class="pagination">
                        <li v-bind:class="{ 'disabled' : pagination.currentPage == 1 }" >
                            <a href="#" v-on:click="previous" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li v-for="value in pagination.pageNumbers" v-bind:class="{ 'active': value == pagination.currentPage }">
                            <a href="#" v-on:click="page($event, value)">@{{ value }}</a>
                        </li>
                        <li v-bind:class="{ 'disabled' : pagination.currentPage == pagination.totalPages }" >
                            <a href="#" v-on:click="next" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                      </ul>
                    </nav>
                </div>
            </div>
        </div>



        <script src="{!! asset('js/app.js') !!}"></script>
    </body>
</html>
