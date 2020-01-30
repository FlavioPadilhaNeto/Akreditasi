import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from "../actions/user";
import apiCall from "utils/api";
import Vue from "vue";
import { AUTH_LOGOUT } from "../actions/auth";

const state = { status: "", profile: {} };

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name
};

const actions = {
    [USER_REQUEST]: ({ commit, dispatch }) => {

		var dados = {
			"credenciamentos": [{
				"id": {
					"type": 1,
					"number": "70194370000192"
				},
				"razaoSocial": "marco REY",
				"nomeFantasia": "marco REY",
				"contatos": [{
					"name": "marco",
					"documentNumber": "88882181065",
					"responsibleType": "10",
					"birthday": "14/12/1978",
					"phones": [{
						"type": 1,
						"country": 55,
						"area": 16,
						"number": 33825132
					}],
					"email": "marcorey@dxc.com",
					"nacionalidade": "Brasileira",
					"socialNetworking": "https://www.facebook.com/mrey",
					"functionDescription": "Contato"
				}],
				"dataFundacao": "10/06/1998",
				"horarioFuncionamento": 9,
				"shopping": false,
				"shoppingDesc": "",
				"urlEcommerce": "",
				"domBanks": [{
					"bankCode": "611",
					"branchNumber": "0001",
					"accountNumber": "298178",
					"codProdutos": ["1", "2", "3", "4", "22", "23"]
				}],
				"enderecos": [{
					"type": 0,
					"street": "Rua 3",
					"number": "678",
					"complement": "",
					"neighborhood": "centro",
					"city": "Araraquara",
					"state": "SP",
					"country": "Brasil",
					"zip": "14808-159"
				},
				{
					"type": 2,
					"street": "Rua 3",
					"number": "678",
					"complement": "",
					"neighborhood": "centro",
					"city": "Araraquara",
					"state": "SP",
					"country": "Brasil",
					"zip": "14808-159"
				}],
				"redeComercial": {
					"matriz": true,
					"tipoEstabelecimento": "EC Matriz",
					"mid": 71883
				},
				"ativPF": "",
				"codigoFilialAdquirente": 180001,
				"codigoAdquirente": 18,
				"departamentos": [{
					"codigo": "2791",
					"descricao": "Datilografia, Digitação e Serviços Relacionados",
					"cnae": "1821-1/00",
					"combo": "COMBO ACQIO TESTE",
					"taxa": "TAXA ACQIO TESTE",
					"terminais": [{
						"posTerminal": {
							"tecnologyCode": "4"
						},
						"qt": 1
					}]
				}],
				"paymentType": 1,
				"companyFormationCode": "02",
				"branchTechnologies": []
			}],
			"idCanal": "180001",
			"urlRetorno": "http://54.94.209.241:8080/"
		};
			

    commit(USER_REQUEST);
		apiCall({ url: "https://api-dxc.sensedia.com/sandbox/h7/acquirer/v1/merchant", method: "POST", data: dados })
			.then(resp => {
				console.log('retorno' + JSON.stringify(resp));
        commit(USER_SUCCESS, resp);
      })
      .catch(() => {
        commit(USER_ERROR);
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT);
      });
  }
};

const mutations = {
  [USER_REQUEST]: state => {
    state.status = "loading";
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = "success";
    Vue.set(state, "profile", resp);
  },
  [USER_ERROR]: state => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: state => {
    state.profile = {};
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
