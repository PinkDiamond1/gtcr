import { Card, Icon, Tooltip, Form, Switch } from 'antd'
import { withFormik, Field } from 'formik'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import * as yup from 'yup'
import CustomInput from '../../components/custom-input'
import itemTypes from '../../utils/item-types'

const FormItem = Form.Item

// TODO: Let users upload their primary document.
const TCRParams = ({
  handleSubmit,
  formId,
  errors,
  setFieldValue,
  touched,
  ...rest
}) => {
  const { values, setTcrState } = rest
  useEffect(() => {
    setTcrState(previousState => ({
      ...previousState,
      ...values
    }))
  }, [values, setTcrState])

  return (
    <Card title="Choose the item columns and identifiers">
      <Form layout="vertical" id={formId} onSubmit={handleSubmit}>
        <CustomInput
          name="tcrTitle"
          placeholder="Token² Curated List"
          label={<span>Title</span>}
          error={errors.tcrTitle}
          touched={touched.tcrTitle}
          hasFeedback
          {...rest}
        />
        <CustomInput
          name="tcrDescription"
          placeholder="A token curated list of tokens powered by Kleros..."
          hasFeedback
          error={errors.tcrDescription}
          touched={touched.tcrDescription}
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
          name="arbitratorAddress"
          placeholder="0x7331deadbeef..."
          hasFeedback
          error={errors.arbitratorAddress}
          touched={touched.arbitratorAddress}
          label={
            <span>
              Arbitrator&nbsp;
              <Tooltip title="The address of the arbitrator to use for this TCR.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
          {...rest}
        />
        <CustomInput
          name="itemName"
          placeholder="Token"
          hasFeedback
          error={errors.itemName}
          touched={touched.itemName}
          label={
            <span>
              Item Name&nbsp;
              <Tooltip
                title={`What is the item? This will replace the word "item" in the TCR interface. Examples.: Ad (for a TCR of ads), Movie (for a TCR of movies)`}
              >
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
          {...rest}
        />
        <CustomInput
          name="submissionBaseDeposit"
          placeholder="0.1 ETH"
          addonAfter="ETH"
          error={errors.submissionBaseDeposit}
          touched={touched.submissionBaseDeposit}
          type={itemTypes.NUMBER}
          label={
            <span>
              Submission Deposit&nbsp;
              <Tooltip title="This will be the deposit required to submit an item.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
          {...rest}
        />
        <CustomInput
          name="removalBaseDeposit"
          placeholder="0.1 ETH"
          addonAfter="ETH"
          error={errors.removalBaseDeposit}
          touched={touched.removalBaseDeposit}
          type={itemTypes.NUMBER}
          label={
            <span>
              Removal Deposit&nbsp;
              <Tooltip title="This will be the deposit required to remove an item.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
          {...rest}
        />
        <CustomInput
          name="submissionChallengeBaseDeposit"
          placeholder="0.05 ETH"
          addonAfter="ETH"
          error={errors.submissionChallengeBaseDeposit}
          touched={touched.submissionChallengeBaseDeposit}
          type={itemTypes.NUMBER}
          label={
            <span>
              Submission Challenge Deposit&nbsp;
              <Tooltip title="This is the deposit required to challenge a submission.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
          {...rest}
        />
        <CustomInput
          name="removalChallengeBaseDeposit"
          placeholder="0.05 ETH"
          addonAfter="ETH"
          error={errors.removalChallengeBaseDeposit}
          touched={touched.removalChallengeBaseDeposit}
          type={itemTypes.NUMBER}
          label={
            <span>
              Removal Challenge Deposit&nbsp;
              <Tooltip title="This is the deposit required to challenge a removal request.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
          {...rest}
        />
        <Field name="requireEvidenceRequest">
          {({ field }) => (
            <FormItem
              label="Require evidence on request"
              style={{ marginBottom: '12px', display: 'flex' }}
            >
              <Switch
                onChange={value =>
                  setFieldValue('requireEvidenceRequest', value)
                }
                style={{ marginLeft: '8px' }}
                checked={field.value}
              />
            </FormItem>
          )}
        </Field>
        {/* Let the user mark if this is a TCR of TCRs. */}
      </Form>
    </Card>
  )
}

TCRParams.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  formId: PropTypes.string.isRequired,
  errors: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
    ])
  ).isRequired,
  touched: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.objectOf(PropTypes.bool))
    ])
  ).isRequired
}

const validationSchema = yup.object().shape({
  tcrTitle: yup
    .string()
    .required('A title is required.')
    .max(30, 'Title must be less than 60 characters long.'),
  tcrDescription: yup
    .string()
    .required('A description is required.')
    .max(255, 'Description must be less than 255 characters long.'),
  arbitratorAddress: yup
    .string()
    .required('An arbitrator address is required.')
    .max(160, 'Ethereum addresses are 42 characters long.'),
  itemName: yup
    .string()
    .required('An item name is required.')
    .max(60, 'The item name must be less than 20 characters long.'),
  submissionBaseDeposit: yup
    .number()
    .typeError('Amount should be a number.')
    .required('A value is required.')
    .min(0, 'The amount must not be negative.'),
  removalBaseDeposit: yup
    .number()
    .typeError('Amount should be a number.')
    .required('A value is required.')
    .min(0, 'The amount must not be negative.'),
  submissionChallengeBaseDeposit: yup
    .number()
    .typeError('Amount should be a number.')
    .required('A value is required.')
    .min(0, 'The amount must not be negative.'),
  removalChallengeBaseDeposit: yup
    .number()
    .typeError('Amount should be a number.')
    .required('A value is required.')
    .min(0, 'The amount must not be negative.')
})

export default withFormik({
  validationSchema,
  mapPropsToValues: ({ tcrState }) => {
    const values = { ...tcrState }
    delete values.transactions
    return values
  },
  handleSubmit: (_, { props: { postSubmit } }) => {
    postSubmit()
  }
})(TCRParams)
