import PropTypes from 'prop-types';

// function arrangeByCategory(arrayOfObjects, category) {

//   const sortedArray = arrayOfObjects.slice();

//   sortedArray.sort(function (a, b) {
//     if (a[category] < b[category]) return -1;
//     if (a[category] > b[category]) return 1;
//     return 0;
//   });

//   const elementsArrangedByCategories = [];
//   let elementsInCurrentCategory = [];
//   let prevElementCategory = sortedArray[0][category];

//   sortedArray.forEach((elm, index) => {
//     if (elm[category] === prevElementCategory) {
//       elementsInCurrentCategory.push(elm);
//       if (index === (sortedArray.length - 1)) {
//         elementsArrangedByCategories.push(elementsInCurrentCategory)
//         elementsInCurrentCategory = [];
//       }
//     } else {
//       if (index === (sortedArray.length - 1)) {
//         elementsInCurrentCategory.push(elm);
//         elementsArrangedByCategories.push(elementsInCurrentCategory)
//         elementsInCurrentCategory = [];
//         return elementsArrangedByCategories;
//       }
//       elementsArrangedByCategories.push(elementsInCurrentCategory);
//       prevElementCategory = elm[category];
//       elementsInCurrentCategory = [];
//     }
//   })

//   return elementsArrangedByCategories;
// }

const serverUrl = 'https://norma.nomoreparties.space/api/ingredients';

const ingredientPropType = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string,
  _id: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
  isLocked: PropTypes.bool,
};

const orderDataPropType = PropTypes.shape({
  orderId: PropTypes.string.isRequired,
  orderStatusOk: PropTypes.bool
});

const orderData = {
  orderId: '034536',
  orderStatusOk: true,
}

export { serverUrl, orderData, ingredientPropType, orderDataPropType };
