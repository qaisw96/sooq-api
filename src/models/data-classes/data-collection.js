'use strict';

class ModelCollection {

  constructor(model) {
    this.model = model;
  }

  get(_id) {
    return _id ? this.model.findOne({_id}) : this.model.find({});
  }

  create(obj) {
    let newObj = new this.model(obj);
    return newObj.save();
  }

  update(id, obj) {
    return this.model.findByIdAndUpdate(id, obj, { new: true });
  }

  deleted(id) {
    return this.model.findByIdAndDelete(id);
  }
}

module.exports = ModelCollection;
