import { Card, Form, Icon, Input, Tooltip } from 'antd'
import { withFormik, Field } from 'formik'
import React from 'react'
import * as yup from 'yup'

const FormItem = Form.Item

const CustomInput = ({ label, name, placeholder, errors, touched, addonAfter }) => (
  <Field name={name} placeholder={placeholder}>
    {({ field }) => (
      <FormItem
        label={label}
        validateStatus={errors[name] && touched[name] ? 'error' : undefined}
        help={errors[name] && touched[name] ? errors[name] : ''}
        hasFeedback
      >
        <Input addonAfter={addonAfter} {...field} />
      </FormItem>
    )}
  </Field>
)

const TCRParamsForm = ({
  handleSubmit,
  formId,
  ...rest
}) => {
  return (
    <Card title="Choose the item columns and identifiers">
      <form id={formId} onSubmit={handleSubmit}>
        <CustomInput name="title" placeholder="Token² Curated List" label={<span>Title</span>} {...rest} />
        <CustomInput
          name="description"
          placeholder="A token curated list of tokens powered by Kleros..."
          label={
            <span>
              Description&nbsp;
              <Tooltip title="A short sentence describing the what are the the TCR items and its listing criteria.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
          {...rest}
        />
        <CustomInput
          name="requestDeposit"
          placeholder="0.1 ETH"
          addonAfter="ETH"
          label={
            <span>
              Registration Deposit&nbsp;
              <Tooltip title="This will be the deposit required to submit or remove an item.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
          {...rest}
        />
        <CustomInput
          name="challengeDeposit"
          placeholder="0.05 ETH"
          addonAfter="ETH"
          label={
            <span>
              Challenger Deposit&nbsp;
              <Tooltip title="This is the deposit required to challenge a submission or removal request.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
          {...rest}
        />
      </form>
    </Card>
  )
}

const validationSchema = yup.object().shape({
  title: yup.string().max(60, 'Title must be less than 60 characters long.'),
  description: yup.string().max(255, 'Description must be less than 255 characters long.'),
  requestDeposit: yup.number().typeError('Amount should be a number').required('A value is required').min(0,'The amount must not be negative'),
  challengeDeposit: yup.number().typeError('Amount should be a number').required('A value is required').min(0,'The amount must not be negative')
})

export default withFormik({
  validationSchema,
  mapPropsToValues: () => ({
    requestDeposit: 0.1,
    challengeDeposit: 0.05
  }),
  handleSubmit: (_, { props: { postSubmit }}) => {
    postSubmit()
  }
})(TCRParamsForm)
