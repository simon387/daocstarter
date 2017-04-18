'use strict';

const playCSS = "class='btnX btn-primary btn-sm sr-button'";
const cancCSS = "class='sr-button btnX btn-primary btn-md btnX-delete'";
const editCSS = "class='sr-button btnX btn-md btn-successX'";

module.exports = {
	correggiRispostaPerDataTable: ret => {
		ret = ret.slice(0, -1) + ']}';
		if (ret === '{"aaData":]}') {
			ret = '{"aaData":[]}';
		}
		return ret;
	},

	getAllNamesHelper: (response, docs) => {
		let array = [];
		docs.forEach(doc => {
			array.push(doc.name);
		});
		return response.send(array);
	},

	playButton: (entity, id) => {
		return '<a href=javascript:play' + entity + "Row(\'" + id +
		"\'); " + playCSS + '>play<\/a>';
	},

	qtdButton: (entity, id) => {
		return '<a href=javascript:kill' + entity + "Row(\'" + id +
		"\'); " + cancCSS + '>qtd<\/a>';
	},

	editButton: (entity, id, type = '') => {
		const idContainer = type === '' ? "(\'" + id + "\'); " : '(' + id + '); ';
		return "<a data-id='row-" + id + "' href=javascript:edit" + entity +
		'Row' + type + idContainer + editCSS + '>edit<\/a>';
	},

	deleteButton: (entity, id) => {
		return '<a href=javascript:remove' + entity + "Row(\'" + id +
		"\'); " + cancCSS + '>X<\/a>';
	}
}
