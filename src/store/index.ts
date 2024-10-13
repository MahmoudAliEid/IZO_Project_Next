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
import getExportSPGSlice from './apps/products/salePriceGroup/actions/getExportSPGSlice'
import postImportSPGSlice from './apps/products/salePriceGroup/actions/postImportSPGSlice'
import postDeleteSPGroupSlice from './apps/products/salePriceGroup/postDeleteSPGroupSlice'
import postEditPGroupSSlice from './apps/products/salePriceGroup/postEditSPGroupSlice'
import getEditSPGroupSlice from './apps/products/salePriceGroup/getEditSPGroupSlice'
import getCreateSPGroupSlice from './apps/products/salePriceGroup/getCreateSPGroupSlice'
import postCreateSPGroupSlice from './apps/products/salePriceGroup/postCreateSPGroupSlice'
import postChangeStatusSlice from './apps/products/salePriceGroup/postChangeStatusSlice'
import postCreateProductUnitSlice from './apps/products/listProducts/actions/postCreateProductUnitSlice'
import getCreateProductUnitSlice from './apps/products/listProducts/actions/getCreateProductUnitSlice'
import getViewStockSlice from './apps/products/listProducts/actions/getViewStockSlice'
import postImportOQSlice from './apps/products/openingQuantity/actions/postImportOQSlice'
import productStoreSlice from './apps/products/productStoreSlice'
import getSearchProductCompo from './apps/products/listProducts/search/getSearchProductCompo'
import getUpdateProductSlice from './apps/products/getUpdateProductSlice'
import postUpdateProductSlice from './apps/products/postUpdateProductSlice'
import postDeleteCGSlice from './apps/contacts/CustomerGroup/postDeleteCGSlice'
// **Vouchers
import getVouchersSlice from './apps/vouchers/getVouchersSlice'
import getViewVoucher from './apps/vouchers/getViewVoucher'
import getCreateReceiptVoucher from './apps/vouchers/getCreateReceiptVoucher'
import getBillsSlice from './apps/vouchers/Actions/getBillsSlice'
import postCreateReceiptSlice from './apps/vouchers/postCreateReceiptSlice'
import getEditReceiptVoucher from './apps/vouchers/getEditReceiptVoucherSlice'
import postEditReceiptSlice from './apps/vouchers/postEditReceiptSlice'
import getAttachmentVoucher from './apps/vouchers/Actions/getAttachmentVoucher'
import getViewEntry from './apps/vouchers/Actions/getViewEntry'
import postDeleteVoucherSlice from './apps/vouchers/postDeleteVoucherSlice'
// ** Journal Vouchers
import getJournalVouchersSlice from './apps/vouchers/journalVoucher/getJournalVoucherSlice'
import getCreateJournalVoucher from './apps/vouchers/journalVoucher/getCreateJournalVoucher'
import getViewJVSlice from './apps/vouchers/journalVoucher/Actions/getViewJVSlice'
import postCreateJVSlice from './apps/vouchers/journalVoucher/postCreateJVSlice'
import postEditJournalVoucher from './apps/vouchers/journalVoucher/postEditJournalVoucher'
import getEditJournalVoucher from './apps/vouchers/journalVoucher/getEditJournalVoucher'
import postDeleteJournalVoucher from './apps/vouchers/journalVoucher/postDeleteJournalVoucher'
import getAttachmentJournalVoucher from './apps/vouchers/journalVoucher/Actions/getAttachmentJournalVoucher'
import getViewJournalEntry from './apps/vouchers/journalVoucher/Actions/getViewJournalEntry'
// ** Cheques
import getChequesSlice from './apps/Cheques/getChequesSlice'
import getCreateChequeSlice from './apps/Cheques/getCreateChequesSlice'
import postCreateChequeSlice from './apps/Cheques/postCreateCheques'
import getEditChequeSlice from './apps/Cheques/getEditChequesSlice'
import postEditChequeSlice from './apps/Cheques/postEditChequesSlice'
import postDeleteChequesSlice from './apps/Cheques/postDeleteChequesSlice'
import collect from './apps/Cheques/Actions/collect'
import refund from './apps/Cheques/Actions/refund'
import getViewChequesSlice from './apps/Cheques/Actions/getViewChequesSlice'
import getEntryChequesSlice from './apps/Cheques/Actions/getEntryChequesSlice'
import getBillsChequesSlice from './apps/Cheques/Actions/getBillsChequesSlice'
import unCollect from './apps/Cheques/Actions/unCollect'
import postDeleteCollectSlice from './apps/Cheques/Actions/postDeleteCollectSlice'
import getAttachmentCheques from './apps/Cheques/Actions/getAttachmentCheques'
// ** Contact Bank
import getContactBankSlice from './apps/Cheques/contactBank/getContactBankSlice'
import getCreateContactBank from './apps/Cheques/contactBank/getCreateContactBank'
import getEditContactBank from './apps/Cheques/contactBank/getEditContactBank'
import postCreateContactBank from './apps/Cheques/contactBank/postCreateContactBank'
import postEditContactBank from './apps/Cheques/contactBank/postEditContactBank'
import postDeleteContactBank from './apps/Cheques/contactBank/postDeleteContactBank'
// ** add opening stock
import getListSlice from './apps/products/addOpeningStock/getListSlice'
import getCreateOpeningStock from './apps/products/addOpeningStock/getCreateOpeningStock'
import getEditOpeningStockSlice from './apps/products/addOpeningStock/getEditOpeningStockSlice'
import postDeleteOpeningStock from './apps/products/addOpeningStock/postDeleteOpeningStock'
import postCreateOpeningStock from './apps/products/addOpeningStock/postCreateOpeningStock'
import postEditOpeningStock from './apps/products/addOpeningStock/postEditOpeningStock'
import getViewOpeningStock from './apps/products/addOpeningStock/getViewOpeningStock'
import getLastProductSlice from './apps/products/addOpeningStock/getLastProductSlice'
// ** Expense Vouchers
import getExpenseVoucher from './apps/vouchers/expenseVoucher/getExpenseVoucher'
import getCreateExpenseVoucher from './apps/vouchers/expenseVoucher/getCreateExpenseVoucher'
import getViewExpenseVoucher from './apps/vouchers/expenseVoucher/Actions/getViewExpenseVoucher'
import getEditExpenseVoucher from './apps/vouchers/expenseVoucher/getEditExpenseVoucher'
import postDeleteExpenseVoucher from './apps/vouchers/expenseVoucher/postDeleteExpenseVoucher'
import getAttachmentExpenseVoucher from './apps/vouchers/expenseVoucher/Actions/getAttachmentExpenseVoucher'
import getEntryExpenseVoucher from './apps/vouchers/expenseVoucher/Actions/getEntryExpenseVoucher'
import postCreateExpenseVoucher from './apps/vouchers/expenseVoucher/postCreateExpenseVoucher'
import postEditExpenseVoucher from './apps/vouchers/expenseVoucher/postEditExpenseVoucher'
// ** Purchases
import getPurchasesSlice from './apps/purchases/getPurchasesSlice'
import getViewAttachmentPurchase from './apps/purchases/Actions/getViewAttachmentPurchase'
import getEntryPurchase from './apps/purchases/Actions/getEntryPurchase'
import getMapPurchase from './apps/purchases/Actions/getMapPurchase'
import getViewPurchase from './apps/purchases/Actions/getViewPurchase'
import getCreatePurchase from './apps/purchases/getCreatePurchase'
import getEditPurchase from './apps/purchases/getEditPurchase'
import postDeletePurchase from './apps/purchases/postDeletePurchase'
import getLastSupplierAddedSlice from './apps/purchases/Actions/getLastSupplierAddedSlice'
import postCreatePurchaseSlice from './apps/purchases/postCreatePurchaseSlice'

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
    postDeleteCustomerGroup: postDeleteCGSlice,
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
    postCreateProduct: productStoreSlice,
    postCreateProductUnit: postCreateProductUnitSlice,
    getCreateProductUnit: getCreateProductUnitSlice,
    postDeleteSPGroup: postDeleteSPGroupSlice,
    postCreateSPGroup: postCreateSPGroupSlice,
    postEditSPGroup: postEditPGroupSSlice,
    postChangeStatus: postChangeStatusSlice,
    getSPGroup: getSPGroupSlice,
    getEditSPGroup: getEditSPGroupSlice,
    getCreateSPGroup: getCreateSPGroupSlice,
    getExportSPGroup: getExportSPGSlice,
    postImportSPGroup: postImportSPGSlice,
    getViewStockProduct: getViewStockSlice,
    postImportOQ: postImportOQSlice,
    getSearchProductCompo: getSearchProductCompo,
    getUpdateProduct: getUpdateProductSlice,
    postUpdateProduct: postUpdateProductSlice,
    getVouchers: getVouchersSlice,
    getViewVoucher: getViewVoucher,
    getCreateReceiptVoucher: getCreateReceiptVoucher,
    getBills: getBillsSlice,
    postCreateReceipt: postCreateReceiptSlice,
    getEditReceiptVoucher: getEditReceiptVoucher,
    postEditReceipt: postEditReceiptSlice,
    getAttachmentVoucher,
    getViewEntry,
    postDeleteVoucher: postDeleteVoucherSlice,
    getCheques: getChequesSlice,
    getCreateCheque: getCreateChequeSlice,
    postCreateCheque: postCreateChequeSlice,
    getEditCheque: getEditChequeSlice,
    postEditCheque: postEditChequeSlice,
    collect,
    refund,
    getViewCheque: getViewChequesSlice,
    getEntryCheques: getEntryChequesSlice,
    getBillsCheques: getBillsChequesSlice,
    unCollect,
    postDeleteCheques: postDeleteChequesSlice,
    deleteCollect: postDeleteCollectSlice,
    getAttachmentCheques,
    getContactBank: getContactBankSlice,
    getCreateContactBank: getCreateContactBank,
    getEditContactBank: getEditContactBank,
    postCreateContactBank: postCreateContactBank,
    postEditContactBank: postEditContactBank,
    postDeleteContactBank: postDeleteContactBank,
    getOpeningStock: getListSlice,
    getCreateOpeningStock: getCreateOpeningStock,
    getEditOpeningStock: getEditOpeningStockSlice,
    postDeleteOpeningStock,
    postCreateOpeningStock,
    postEditOpeningStock,
    getViewOpeningStock,
    getLastProduct: getLastProductSlice,
    getJournalVouchers: getJournalVouchersSlice,
    getCreateJournalVoucher,
    getViewJVSlice,
    postCreateJVSlice,
    postEditJournalVoucher,
    getEditJournalVoucher,
    postDeleteJournalVoucher,
    getAttachmentJournalVoucher,
    getViewJournalEntry,
    getExpenseVoucher,
    getCreateExpenseVoucher,
    getViewExpenseVoucher,
    getEditExpenseVoucher,
    postDeleteExpenseVoucher,
    getAttachmentExpenseVoucher,
    getEntryExpenseVoucher,
    postCreateExpenseVoucher,
    postEditExpenseVoucher,
    getPurchases: getPurchasesSlice,
    getViewAttachmentPurchase,
    getEntryPurchase,
    getMapPurchase,
    getViewPurchase,
    getCreatePurchase,
    getEditPurchase,
    postDeletePurchase,
    getLastSupplierAdded: getLastSupplierAddedSlice,
    postCreatePurchase: postCreatePurchaseSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
