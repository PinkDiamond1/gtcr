import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Modal, Descriptions, Typography, Divider, Spin } from 'antd'
import { ethers } from 'ethers'
import { abi as _gtcr } from '@kleros/tcr/build/contracts/GeneralizedTCR.json'
import { TCRViewContext } from '../../../bootstrap/tcr-view-context'
import ETHAmount from '../../../components/eth-amount'
import { WalletContext } from '../../../bootstrap/wallet-context'
import itemPropTypes from '../../../prop-types/item'
import styled from 'styled-components/macro'

const StyledSpin = styled(Spin)`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`

const RemoveModal = ({ item, itemName = 'item', fileURI, ...rest }) => {
  // Get contract data.
  const { removalDeposit, tcrAddress } = useContext(TCRViewContext)
  const { pushWeb3Action } = useContext(WalletContext)

  const requestStatusChange = () => {
    pushWeb3Action(async (_, signer) => {
      const gtcr = new ethers.Contract(tcrAddress, _gtcr, signer)

      // Request signature and submit.
      const tx = await gtcr.removeItem(item.data, {
        value: removalDeposit
      })

      rest.onCancel() // Hide the submission modal.
      return {
        tx,
        actionMessage: `Requesting ${itemName || 'item'} removal`
      }
    })
  }

  if (!removalDeposit)
    return (
      <Modal title="Submit Item" {...rest}>
        <StyledSpin />
      </Modal>
    )

  // TODO: Check if TCR requires evidence upon placing a removal request and if so, require it.
  return (
    <Modal {...rest} onOk={requestStatusChange}>
      <Typography.Title level={4}>
        See the&nbsp;
        <a
          href={`${process.env.REACT_APP_IPFS_GATEWAY}${fileURI || ''}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Listing Criteria
        </a>
        .
      </Typography.Title>
      <Typography.Paragraph>
        To remove an item, a deposit is required. This value will be reimbursed
        after the challenge period if no one challenges the request.
      </Typography.Paragraph>
      <Divider />
      <Descriptions
        bordered
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      >
        <Descriptions.Item label="Total Deposit Required">
          <ETHAmount
            decimals={3}
            amount={removalDeposit.toString()}
            displayUnit
          />
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

RemoveModal.propTypes = {
  item: itemPropTypes,
  itemName: PropTypes.string,
  fileURI: PropTypes.string
}

RemoveModal.defaultProps = {
  item: null,
  itemName: 'item',
  fileURI: ''
}

export default RemoveModal
