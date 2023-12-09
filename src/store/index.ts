// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import loginSlice from './apps/auth/login/index'
import registerSlice from './apps/auth/register'
import loginFirstTimeSlice from './apps/auth/loginFirstTime'
import usersSlice from 'src/store/apps/users'
import dashboardSlice from './apps/dashboard/dashboardSlice'
import izoUsersSlice from 'src/store/apps/izoUsers/izoUsersSlice'
import createUsersSlice from 'src/store/apps/izoUsers/createUserSlice'
import editUsersSlice from 'src/store/apps/izoUsers/editUsersSlice'
import deleteUserSlice from './apps/izoUsers/deleteUserSlice'
import postEditUserSlice from './apps/izoUsers/postEditUserSlice'
import storeUserSlice from './apps/izoUsers/storeUserSlice'
import viewUserSlice from './apps/izoUsers/viewUserSlice'
import customersSlice from './apps/contacts/getCustomersSlice'
import getSuppliersSlice from './apps/contacts/getSuppliersSlice'
import getCustomerGroupSlice from './apps/contacts/CustomerGroup/getCustomerGroupSlice'
import getCreateCGSlice from './apps/contacts/CustomerGroup/getCreateCGSlice'
import postCreateCGSlice from './apps/contacts/CustomerGroup/postCreateCGSlice'
import getEditCGSlice from './apps/contacts/CustomerGroup/getEditCGSlice'
import postEditCGSlice from './apps/contacts/CustomerGroup/postEditCGSlice'
import getVariationsSlice from './apps/products/variations/getVariationsSlice'
import getCreateVariationsSlice from './apps/products/variations/getCreateVariationsSlice'
import postCreateVariationsSlice from './apps/products/variations/postCreateVariations'
import deleteVariationsSlice from './apps/products/variations/deleteVariationsSlice'
import contactCreateSlice from './apps/contacts/contactCreateSlice'
import contactStoreSlice from './apps/contacts/contactStoreSlice'
import contactEditSlice from './apps/contacts/contactEditSlice'
import contactUpdateSlice from './apps/contacts/contactUpdateSlice'
import getViewContactSlice from './apps/contacts/getViewContactSlice'
import getEditVariationsSlice from './apps/products/variations/getEditVariationsSlice'
import deleteVariationRowSlice from './apps/products/variations/deleteVariationRowSlice'
import deleteContactSlice from './apps/contacts/deleteContactSlice'
import postEditVariationsSlice from './apps/products/variations/postEditVariationsSlice'
import getCategoriesSlice from './apps/products/categories/getCategoriesSlice'
import postCreateCategorySlice from './apps/products/categories/postCreateCategorySlice'
import deleteCategorySlice from './apps/products/categories/deleteCategorySlice'
import getCreateCategorySlice from './apps/products/categories/getCreateCategorySlice'
import getEditCategorySlice from './apps/products/categories/getEditCategorySlice'
import postEditCategorySlice from './apps/products/categories/postEditCategorySlice'
import getallbrandsSlice from './apps/products/brands/getallbrandsSlice'
import deletebrandsSlice from './apps/products/brands/deletebrandsSlice'
import storebrandSlice from './apps/products/brands/storebrandSlice'
import getbrandDetailsSlice from './apps/products/brands/getbrandDetailsSlice'
import updatebrandSlice from './apps/products/brands/updatebrandSlice'
import getUnitsSlice from './apps/products/units/getUnitsSlice'
import getCreateUnitSlice from './apps/products/units/getCreateUnitSlice'
import getEditUnitSlice from './apps/products/units/getEditUnitSlice'
import postCreateUnitSlice from './apps/products/units/postCreateUnitSlice'
import postEditUnitSlice from './apps/products/units/postEditUnitSlice'
import postDeleteUnitSlice from './apps/products/units/postDeleteUnitSlice'
import getCategoriesTreeSlice from './apps/products/categories/getCategoriesTreeSlice'
import getallWarrantiesSlice from './apps/products/warranties/getallWarrantiesSlice'
import storeWarrantiesSlice from './apps/products/warranties/storeWarrantiesSlice'
import getAllWarrantiesDetailsSlice from './apps/products/warranties/getAllWarrantiesDetailsSlice'
import updateWarrantiesSlice from './apps/products/warranties/updateWarrantiesSlice'
import deleteWarrantiesSlice from './apps/products/warranties/deleteWarrantiesSlice'
import getCreateProductSlice from './apps/products/listProducts/getCreateProductSlice'
import getProductsSlice from './apps/products/listProducts/getProductsSlice'
import postDeleteProductSlice from './apps/products/listProducts/postDeleteProductSlice'
import getSPGroupSlice from './apps/products/salePriceGroup/getSPGroupSlice'
import postDeleteSPGroupSlice from './apps/products/salePriceGroup/postDeleteSPGroupSlice'
import postEditPGroupSSlice from './apps/products/salePriceGroup/postEditSPGroupSlice'
import getEditSPGroupSlice from './apps/products/salePriceGroup/getEditSPGroupSlice'
import getCreateSPGroupSlice from './apps/products/salePriceGroup/getCreateSPGroupSlice'
import postCreateSPGroupSlice from './apps/products/salePriceGroup/postCreateSPGroupSlice'
import postChangeStatusSlice from './apps/products/salePriceGroup/postChangeStatusSlice'
import postCreateProductUnitSlice from './apps/products/listProducts/actions/postCreateProductUnitSlice'
import getCreateProductUnitSlice from './apps/products/listProducts/actions/getCreateProductUnitSlice'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    login: loginSlice,
    register: registerSlice,
    loginFirstTime: loginFirstTimeSlice,
    usersNames: usersSlice,
    dashboardAnalytics: dashboardSlice,
    users: izoUsersSlice,
    createUser: createUsersSlice,
    editUsers: editUsersSlice,
    deleteUser: deleteUserSlice,
    postEditUser: postEditUserSlice,
    storeUser: storeUserSlice,
    viewUser: viewUserSlice,
    getCustomers: customersSlice,
    getSuppliers: getSuppliersSlice,
    getCustomerGroup: getCustomerGroupSlice,
    getCreateCustomerGroup: getCreateCGSlice,
    postCreateCustomerGroup: postCreateCGSlice,
    getEditCustomerGroup: getEditCGSlice,
    postEditCustomerGroup: postEditCGSlice,
    getViewContact: getViewContactSlice,
    contactCreateSlice: contactCreateSlice,
    contactStoreSlice: contactStoreSlice,
    contactEditSlice: contactEditSlice,
    contactUpdateSlice: contactUpdateSlice,
    getCreateVariations: getCreateVariationsSlice,
    getVariations: getVariationsSlice,
    deleteVariations: deleteVariationsSlice,
    getEditVariations: getEditVariationsSlice,
    postCreateVariations: postCreateVariationsSlice,
    postEditVariations: postEditVariationsSlice,
    deleteVariationValueRow: deleteVariationRowSlice,
    deleteContact: deleteContactSlice,
    getCategories: getCategoriesSlice,
    postCreateCategory: postCreateCategorySlice,
    deleteCategory: deleteCategorySlice,
    getCreateCategory: getCreateCategorySlice,
    getEditCategory: getEditCategorySlice,
    postEditCategory: postEditCategorySlice,
    getallbrandsSlice: getallbrandsSlice,
    deletebrandsSlice: deletebrandsSlice,
    storebrandSlice: storebrandSlice,
    getbrandDetailsSlice: getbrandDetailsSlice,
    updatebrandSlice: updatebrandSlice,
    getUnits: getUnitsSlice,
    getCreateUnit: getCreateUnitSlice,
    getEditUnit: getEditUnitSlice,
    postCreateUnit: postCreateUnitSlice,
    postEditUnit: postEditUnitSlice,
    postDeleteUnit: postDeleteUnitSlice,
    getCategoriesTree: getCategoriesTreeSlice,
    getallWarrantiesSlice: getallWarrantiesSlice,
    storeWarrantiesSlice: storeWarrantiesSlice,
    getAllWarrantiesDetailsSlice: getAllWarrantiesDetailsSlice,
    updateWarrantiesSlice: updateWarrantiesSlice,
    deleteWarrantiesSlice: deleteWarrantiesSlice,
    getCreateProduct: getCreateProductSlice,
    getProducts: getProductsSlice,
    postDeleteProduct: postDeleteProductSlice,
    postCreateProductUnit: postCreateProductUnitSlice,
    getCreateProductUnit: getCreateProductUnitSlice,
    postDeleteSPGroup: postDeleteSPGroupSlice,
    postCreateSPGroup: postCreateSPGroupSlice,
    postEditSPGroup: postEditPGroupSSlice,
    postChangeStatus: postChangeStatusSlice,
    getSPGroup: getSPGroupSlice,
    getEditSPGroup: getEditSPGroupSlice,
    getCreateSPGroup: getCreateSPGroupSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
