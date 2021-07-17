const RULES = {
	OFF: "off",
	WARN: "warn",
	ERROR: "error",
};
//

module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ["eslint:recommended", "plugin:react/recommended"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react"],
	rules: {
		"react/prop-types": RULES.OFF,
		"react/react-in-jsx-scope": RULES.OFF,
	},
};
