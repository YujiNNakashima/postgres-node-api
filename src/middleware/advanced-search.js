const {checkProperties} = require('../utils')

module.exports.advancedSearch = (req, res, next) => {
      let options = {where: {}}

      let reqQuery = {...req.query}
      const removeFields = ['limit', 'offset']

      removeFields.forEach(param => delete reqQuery[param])
      
      const query = req.query;

      let haveProps = checkProperties(query);

      if (haveProps) {
        const props = Object.keys(query);
        options.attributes = [...props]
      } 
      
      if (!haveProps) {
        options.where = {...reqQuery}
      }

      if(query.limit) {
        options.limit = query.limit
      }

      if(query.offset) {
        options.offset = query.offset
      }
      
      req.options = options

      next();
}
