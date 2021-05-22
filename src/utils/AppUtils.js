const AppUtils = {
	isEmpty: (value) => {
		if (value == null || typeof value === "undefined" || value == ""
			|| (Array.isArray(value) && value.length === 0)
			|| (typeof value === 'object' && Object.keys(value).length === 0)
			|| (typeof value === 'string' && value.trim().length == 0)) {
			return true;
		}
		return false;
	},
	isNotEmpty: (value) => {
		return !AppUtils.isEmpty(value);
	},
	convertToDropdownOption: (option) => {
		let list = [];
		if (AppUtils.isNotEmpty(option)) {
			Object.keys(option).map((key, index) => {
				if (AppUtils.isNotEmpty(key)) {
					let obj = {
						label: option[key],
						value: key,
						key: option[key] + index
					}
					list.push(obj);
				}

			});
		}
		return list;
	}
}

export default AppUtils;
