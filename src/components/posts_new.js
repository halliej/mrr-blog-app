import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import _ from 'lodash';

import { createPost } from '../actions';

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title for Post',
    key: 1
  },
  categories: {
    type: 'input',
    label: 'Enter categories for this post',
    key: 2
  },
  content: {
    type: 'textarea',
    label: 'Post contents',
    key: 3
  }
};

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        this.context.router.push('/');
      });
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];
    return (
      <div
        className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}
        key={fieldConfig.key}
      >
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
        <div className="text-help">
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>

        {_.map(FIELDS, this.renderField.bind(this))}

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = `Enter ${field}`;
    }
  });
  return errors;
}

export default reduxForm({
  form: 'PostNewForm',
  fields: _.keys(FIELDS),
  validate
}, null, { createPost })(PostsNew);
