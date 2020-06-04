import { capitalizeFirstLetter } from '../../utils/string'

const itemTourSteps = metadata => {
  const { itemName, itemNamePlural } = metadata || {}

  return [
    {
      content: `Lets take a quick tour of the ${(itemName &&
        itemName.toLowerCase()) ||
        'item'} details view.`
    },
    {
      selector: `#item-status-card`,
      content: `Here you can find information on the current state of the ${(itemName &&
        itemName.toLowerCase()) ||
        'item'}`
    },
    {
      selector: `#item-action-button`,
      content: `Here you will find available actions for the ${(itemName &&
        itemName.toLowerCase()) ||
        'item'}. ${capitalizeFirstLetter(itemNamePlural) ||
        'Items'} can be submitted, removed or challenged depending on its state.`
    },
    {
      selector: `#item-details-card`,
      content: `This is the ${(itemName && itemName.toLowerCase()) ||
        'item'} details card. These are important fields to check against the listing criteira of this list.`
    },
    {
      selector: `#request-timelines`,
      content: `This is the ${(itemName && itemName.toLowerCase()) ||
        'item'} history card. Here you will find important information of ongoing submissions and removal requests such as rulings, evidence and appeals. If there is a dispute, this is also where you will submit evidence.`
    },
    {
      selector: `#badges`,
      content: `This is the badges section. Badges are an easy way to see if the ${(itemName &&
        itemName.toLowerCase()) ||
        'item'} is present on another list, or to submit it.`
    }
  ]
}

export default itemTourSteps