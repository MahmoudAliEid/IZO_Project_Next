"use client";
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { Checkbox, FormControlLabel } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'src/@core/components/icon';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Formik, Field } from 'formik';
import { AppDispatch } from 'src/store';
import { fetchCreateUsers } from 'src/store/apps/izoUsers/createUserSlice';
import CustomInput from './PickersComponent';
import DatePicker from 'react-datepicker';
import { DateType } from 'src/types/forms/reactDatepickerTypes';
import { SidebarAddUserType, Header, initialValues, validationSchema } from './AddUserDrawer';

// const schema = yup.object().shape({
//   company: yup.string().required(),
//   country: yup.string().required(),
//   billing: yup.string().required(),
//   email: yup.string().email().required(),
//   contact: yup
//     .number()
//     .typeError('Contact Number field is required')
//     .min(10, obj => showErrors('Contact Number', obj.value.length, obj.min))
//     .required(),
//   fullName: yup
//     .string()
//     .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
//     .required(),
//   username: yup
//     .string()
//     .min(3, obj => showErrors('Username', obj.value.length, obj.min))
//     .required()
// })
// const defaultValues = {
//   email: '',
//   company: '',
//   country: '',
//   billing: '',
//   fullName: '',
//   username: '',
//   contact: Number('')
// }
export const SidebarAddUser = (props: SidebarAddUserType) => {

    const theme = useTheme();
    const { direction } = theme;
    const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end';

    // ** Props
    const { open, toggle } = props;
    const [Requirements, setRequirements] = useState<object>({
        BusinessLocation: [],
        ProductPrice: [],
        accounts: [],
        agents: [],
        contacts: [],
        cost_center: [],
        gender: [],
        marital: [],
        patterns: [],
        roles: [],
        taxes: [],
        warehouse: []
    });

    const [date, setDate] = useState<DateType>(new Date());



    const [businessLocation, setBusinessLocation] = useState<string>('');

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchCreateUsers());
    }, [dispatch]);

    const data = useSelector((state: { createUser: { data: any; }; }) => state.createUser.data);

    // console.log(data, '====> data')
    useEffect(() => {
        if (data !== null && data !== undefined) {
            setRequirements(data.Requirement);
            console.log(data.Requirement, '====> data');
        }
    }, [data]);

    const handleClose = () => {
        toggle();
    };

    const handleSubmit = (values: Record<string, any>, { resetForm }: { resetForm: () => void; }) => {
        // Handle form submission logic here
        console.log(values);
        resetForm();
    };


    return (

        <Drawer
            open={open}
            anchor='right'
            variant='temporary'
            onClose={handleClose}
            ModalProps={{ keepMounted: true }}
            sx={{ '& .MuiDrawer-paper': { width: { xs: 800, sm: 900, md: 1000 } } }}
        >
            <Header>
                <Typography variant='h6'>Add User</Typography>
                <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
                    <Icon icon='bx:x' fontSize={20} />
                </IconButton>
            </Header>
            <Box sx={{ p: 5 }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        values, errors, touched, handleBlur, handleChange, handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit}>

                            {/*
                      header first section
                    */}
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: 3,
                                    mb: 2
                                }}
                            >
                                <FormControl fullWidth variant="outlined" sx={{ gridColumn: 'span 2' }}>
                                    <InputLabel id="prefix-label">Prefix</InputLabel>
                                    <Select
                                        labelId="prefix-label"
                                        id="prefix"
                                        name="prefix"
                                        value={values.prefix}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!touched.prefix && !!errors.prefix}
                                        label="Prefix"
                                    >
                                        <MenuItem value="">None</MenuItem>
                                        <MenuItem value="Mr.">Mr.</MenuItem>
                                        <MenuItem value="Mrs.">Mrs.</MenuItem>
                                        <MenuItem value="Ms.">Ms.</MenuItem>
                                    </Select>
                                </FormControl>
                                <Field as={TextField} name="firstName" label="First Name" variant="outlined" fullWidth margin="normal" />
                                <Field as={TextField} name="lastName" label="Last Name" variant="outlined" fullWidth margin="normal" />
                            </Box>

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: 3,
                                    mb: 6
                                }}
                            >
                                <Field as={TextField} name="email" label="E-mail" variant="outlined" fullWidth margin="normal" />
                                {/*
                     check box for is active
                   */}

                                <FormControlLabel
                                    label="Is Active"
                                    control={<Checkbox
                                        checked={values.isActive}
                                        onChange={handleChange}
                                        name="isActive"
                                        color="primary"
                                        onClick={() => {
                                            values.isActive = !values.isActive;
                                        }} />} />
                            </Box>

                            <Divider style={{ margin: '16px 0' }} />

                            {/*
                      second section header
                    */}

                            <Typography variant="h6" gutterBottom component="div">
                                Mobile App settings
                            </Typography>


                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: 3,
                                    mb: 2
                                }}
                            >
                                <FormControl fullWidth sx={{ mb: 6 }}>
                                    <InputLabel
                                        id="demo-simple-select-standard-label"
                                    >Acount Cash </InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="demo-simple-select-standard-label"
                                        name='accounts'
                                        value={values.accounts}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!touched.prefix && !!errors.prefix}
                                        label="Acount Cash"
                                    >
                                        {Object.keys(Requirements).length === 0 ? null :
                                            Requirements.accounts.map((item: any) => (
                                                <MenuItem
                                                    value={item.id}
                                                    key={item.id}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth sx={{ mb: 6 }}>
                                    <InputLabel
                                        id="demo-simple-select-standard-label"
                                    >Visa Account </InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="demo-simple-select-standard-label"
                                        name='visa'
                                        value={values.visa}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!touched.prefix && !!errors.prefix}
                                        label="Visa Account"
                                    >
                                        {Object.keys(Requirements).length === 0 ? null :
                                            Requirements.accounts.map((item: any) => (
                                                <MenuItem
                                                    value={item.id}
                                                    key={item.id}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: 3,
                                    mb: 2
                                }}
                            >
                                <FormControl fullWidth sx={{ mb: 6 }}>
                                    <InputLabel
                                        id="demo-simple-select-standard-label"
                                    > agents </InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="demo-simple-select-standard-label"
                                        name='agents'
                                        value={values.agents}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!touched.prefix && !!errors.prefix}
                                        label=" agents"
                                    >
                                        {Object.keys(Requirements).length === 0 ? null :
                                            Requirements.agents.map((item: any) => (
                                                <MenuItem
                                                    value={item.id}
                                                    key={item.id}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth sx={{ mb: 6 }}>
                                    <InputLabel
                                        id="demo-simple-select-standard-label"
                                    > cost_center </InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="demo-simple-select-standard-label"
                                        name='cost_center'
                                        value={values.cost_center}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!touched.prefix && !!errors.prefix}
                                        label=" cost_center"
                                    >
                                        {Object.keys(Requirements).length === 0 ? null :
                                            Requirements.cost_center.map((item: any) => (
                                                <MenuItem
                                                    value={item.id}
                                                    key={item.id}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>

                            </Box>

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: 3,
                                    mb: 2
                                }}
                            >
                                <FormControl fullWidth sx={{ mb: 6 }}>
                                    <InputLabel
                                        id="demo-simple-select-standard-label"
                                    > Warehouse name </InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="demo-simple-select-standard-label"
                                        name='warehouse'
                                        value={values.warehouse}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!touched.prefix && !!errors.prefix}
                                        label="Warehouse name"
                                    >
                                        {Object.keys(Requirements).length === 0 ? null :
                                            Requirements.warehouse.map((item: any) => (
                                                <MenuItem
                                                    value={item.id}
                                                    key={item.id}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth sx={{ mb: 6 }}>
                                    <InputLabel
                                        id="demo-simple-select-standard-label"
                                    >List Patterns </InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="demo-simple-select-standard-label"
                                        name='patterns'
                                        value={values.patterns}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!touched.prefix && !!errors.prefix}
                                        label="List Patterns"
                                    >
                                        {Object.keys(Requirements).length === 0 ? null :
                                            Requirements.patterns.map((item: any) => (
                                                <MenuItem
                                                    value={item.id}
                                                    key={item.id}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Divider style={{ margin: '16px 0' }} />
                            {/*
                    
                    third section header
                    */}

                            <Typography variant="h6" gutterBottom component="div">
                                Rols and Permissions
                            </Typography>

                            <Box>
                                {/* check box  */}
                                <FormControlLabel
                                    label="allow login"
                                    control={<Checkbox
                                        checked={values.allowlogin}
                                        onChange={handleChange}
                                        name="allowlogin"
                                        color="primary"
                                        onClick={() => {
                                            values.allowlogin = !values.allowlogin;
                                        }} />} />
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: 3,
                                        mb: 2
                                    }}
                                >

                                    <Field as={TextField} name="username" label="Username" variant="outlined" fullWidth margin="normal" />
                                    <TextField
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={values.password}
                                        name='password'
                                        onChange={handleChange} />
                                    <TextField
                                        label="Confirm Password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={values.confirmPassword}
                                        name='confirmPassword'
                                        onChange={handleChange} />
                                </Box>
                                <FormControl fullWidth sx={{ mb: 6 }}>
                                    <InputLabel
                                        id="demo-simple-select-standard-label"
                                    >Select roles </InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="demo-simple-select-standard-label"
                                        name='roles'
                                        value={values.roles}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!touched.prefix && !!errors.prefix}
                                        label="Select roles"
                                    >
                                        <MenuItem value="">None</MenuItem>
                                        {Object.keys(Requirements).length === 0 ? null :
                                            Requirements.roles.map((item: any) => (
                                                <MenuItem
                                                    value={item.id}
                                                    key={item.id}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: 3,
                                        mb: 2
                                    }}
                                >


                                    <Typography variant="body1" gutterBottom component="div">
                                        Access Location  <PriorityHighIcon />
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <FormControlLabel
                                            label="all locations"
                                            control={<Checkbox
                                                checked={values.allLocations}
                                                onChange={handleChange}
                                                name="allLocations"
                                                color="primary"
                                                onClick={() => {
                                                    values.allLocations = !values.allLocations;
                                                }} />} />

                                        <FormControlLabel
                                            label="ACT"
                                            control={<Checkbox
                                                checked={values.AGT}
                                                onChange={handleChange}
                                                name="AGT"
                                                color="primary"
                                                onClick={() => {
                                                    values.AGT = !values.AGT;
                                                }} />} />
                                    </Box>
                                </Box>

                            </Box>
                            <Divider style={{ margin: '16px 0' }} />
                            {/*
                    
                    fourth section header
                    */}

                            <Typography variant="h6" gutterBottom component="div">
                                Sales
                            </Typography>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: 3,
                                    mb: 2
                                }}
                            >

                                {/*
                        sales commission precentage (%) FIELD INPUT
                      */}
                                <Field as={TextField}
                                    name="salesCommission"
                                    value={values.salesCommission}
                                    onChange={handleChange}
                                    label="Sales Commission Precentage (%)" variant="outlined" fullWidth margin="normal"
                                    placeholder="sales commission precentage (%)" />
                                {/*
                      max sales discount precentage (%) FIELD INPUT
                    */}
                                <Field as={TextField}
                                    name="maxSalesDiscount"
                                    label="Max Sales Discount Precentage (%)" variant="outlined" fullWidth margin="normal"
                                    placeholder="max sales discount precentage (%)"
                                    value={values.maxSalesDiscount}
                                    onChange={handleChange} />

                                {/*
                    list patterns FIELD INPUT
                    */}

                                <FormControl
                                    fullWidth
                                    sx={{ m: 0 }}
                                >
                                    <InputLabel
                                        id="demo-simple-select-standard-label"
                                    >List Patterns </InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="demo-simple-select-standard-label"
                                        name='patterns'
                                        value={values.patterns}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!touched.prefix && !!errors.prefix}
                                        label="List Patterns"
                                    >
                                        {Object.keys(Requirements).length === 0 ? null :
                                            Requirements.patterns.map((item: any) => (
                                                <MenuItem
                                                    value={item.id}
                                                    key={item.id}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>

                                {/*
                      check box for allow selected contacts
                    */}
                                <FormControlLabel
                                    label="Allow selected contacts"
                                    control={<Checkbox
                                        checked={values.allowSlctdContacts}
                                        onChange={handleChange}
                                        name="allowlogin"
                                        color="primary"
                                        onClick={() => {
                                            values.allowSlctdContacts = !values.allowSlctdContacts;
                                        }} />} />
                            </Box>

                            <Divider style={{ margin: '16px 0' }} />
                            {/*
                      fifth section header
                    */}
                            <Typography variant="h6" gutterBottom component="div">
                                More Information
                            </Typography>

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: 3,
                                    mb: 2,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >

                                {/*
                      filed date of birth
                    */}
                                <div>
                                    <DatePicker
                                        selected={date}
                                        id='basic-input'
                                        popperPlacement={popperPlacement}
                                        onChange={(date: Date) => setDate(date)}
                                        placeholderText='Click to select a date'
                                        customInput={<CustomInput label='Basic' />} />
                                </div>


                                {/*
                      drop down for Gender
                    */}

                                <FormControl fullWidth>
                                    <InputLabel
                                        id="demo-simple-select-standard-label"
                                    >Select gender </InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="demo-simple-select-standard-label"
                                        name='gender'
                                        value={values.gender}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!touched.prefix && !!errors.prefix}
                                        label="Select gender"
                                    >
                                        {Object.keys(Requirements).length === 0 ? null :
                                            Requirements.gender.map((item: any) => (
                                                <MenuItem
                                                    value={item.id}
                                                    key={item.id}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>

                                {/*
                      drop down for marital status
                    */}


                                <FormControl fullWidth>
                                    <InputLabel
                                        id="demo-simple-select-standard-label"
                                    >Select marital </InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="demo-simple-select-standard-label"
                                        name='marital'
                                        value={values.marital}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!touched.prefix && !!errors.prefix}
                                        label="Select marital"
                                    >
                                        {Object.keys(Requirements).length === 0 ? null :
                                            Requirements.marital.map((item: any) => (
                                                <MenuItem
                                                    value={item.id}
                                                    key={item.id}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                                {/*
                      filed Blood Group
                    */}
                                <Field as={TextField}
                                    name="bloodGroup"
                                    label="Blood Group" variant="outlined" fullWidth margin="normal"
                                    placeholder="blood group"
                                    value={values.bloodGroup}
                                    onChange={handleChange} />

                                {/*
                      filel Mobile Number type number
                    */}
                                <Field as={TextField}
                                    name="mobileNumber"
                                    label="Mobile Number" variant="outlined" fullWidth margin="normal"
                                    placeholder="mobile number"
                                    value={values.mobileNumber}
                                    onChange={handleChange} />

                                {/*
                        filed alternative mobile number
                      */}
                                <Field as={TextField}
                                    name="alternativeMobileNumber"
                                    label="Alternative Mobile Number" variant="outlined" fullWidth margin="normal"
                                    placeholder="alternative mobile number"
                                    value={values.alternativeMobileNumber}
                                    onChange={handleChange} />

                                {/*
                      filed family contact number
                    */}
                                <Field as={TextField}
                                    name="familyContactNumber"
                                    label="Family Contact Number" variant="outlined" fullWidth margin="normal"
                                    placeholder="family contact number"
                                    value={values.familyContactNumber}
                                    onChange={handleChange} />

                                {/*
                      filed facebook link
                    */}
                                <Field as={TextField}
                                    name="facebookLink"
                                    label="Facebook Link" variant="outlined" fullWidth margin="normal"
                                    placeholder="facebook link"
                                    value={values.facebookLink}
                                    onChange={handleChange} />

                                {/*
                        filed twitter link
                      */}

                                <Field as={TextField}
                                    name="twitterLink"
                                    label="Twitter Link" variant="outlined" fullWidth margin="normal"
                                    placeholder="twitter link"
                                    value={values.twitterLink}
                                    onChange={handleChange} />

                                {/*
                      filed social media 1
                    */}
                                <Field as={TextField}
                                    name="socialMedia1"
                                    label="Social Media 1" variant="outlined" fullWidth margin="normal"
                                    placeholder="social media 1"
                                    value={values.socialMedia1}
                                    onChange={handleChange} />

                                {/*
                        filed social media 2
                      */}
                                <Field as={TextField}
                                    name="socialMedia2"
                                    label="Social Media 2" variant="outlined" fullWidth margin="normal"
                                    placeholder="social media 2"
                                    value={values.socialMedia2}
                                    onChange={handleChange} />

                                {/*
                        filed custom field 1
                      */}
                                <Field as={TextField}
                                    name="customField1"
                                    label="Custom Field 1" variant="outlined" fullWidth margin="normal"
                                    placeholder="custom field 1"
                                    value={values.customField1}
                                    onChange={handleChange} />

                                {/*
                        filed custom field 2
                      */}
                                <Field as={TextField}
                                    name="customField2"
                                    label="Custom Field 2" variant="outlined" fullWidth margin="normal"
                                    placeholder="custom field 2"
                                    value={values.customField2}
                                    onChange={handleChange} />

                                {/*
                        filed custom field 3
                      */}
                                <Field as={TextField}
                                    name="customField3"
                                    label="Custom Field 3" variant="outlined" fullWidth margin="normal"
                                    placeholder="custom field 3"
                                    value={values.customField3}
                                    onChange={handleChange} />

                                {/*
                          filed custom field 4
                        */}

                                <Field as={TextField}
                                    name="customField4"
                                    label="Custom Field 4" variant="outlined" fullWidth margin="normal"
                                    placeholder="custom field 4"
                                    value={values.customField4}
                                    onChange={handleChange} />

                                {/*
                          filed cuardiand name
                        */}
                                <Field as={TextField}
                                    name="guardianName"
                                    label="Guardian Name" variant="outlined" fullWidth margin="normal"
                                    placeholder="guardian name"
                                    value={values.guardianName}
                                    onChange={handleChange} />

                                {/*
                            filed ID Proof name
                          */}
                                <Field as={TextField}
                                    name="idProofName"
                                    label="ID Proof Name" variant="outlined" fullWidth margin="normal"
                                    placeholder="id proof name"
                                    value={values.idProofName}
                                    onChange={handleChange} />

                                {/*
                                filed ID Proof Number
                              */}
                                <Field as={TextField}
                                    name="idProofNumber"
                                    label="ID Proof Number" variant="outlined" fullWidth margin="normal"
                                    placeholder="id proof number"
                                    value={values.idProofNumber}
                                    onChange={handleChange} />

                                {/*
                      filed premanent address
                      */}

                                <Field as={TextField}
                                    name="permanentAddress"
                                    label="Permanent Address" variant="outlined" fullWidth margin="normal"
                                    placeholder="permanent address"
                                    value={values.permanentAddress}
                                    onChange={handleChange} />

                                {/*
                        filed current address
                        */}

                                <Field as={TextField}
                                    name="currentAddress"
                                    label="Current Address" variant="outlined" fullWidth margin="normal"
                                    placeholder="current address"
                                    value={values.currentAddress}
                                    onChange={handleChange} />


                            </Box>


                            {/* {Object.keys(Requirements).map((noun) => (
                      <FormControl key={noun} fullWidth variant="outlined" sx={{ gridColumn: 'span 2', mb: 6 }}>
      
                        <InputLabel id={`${noun}-label`}>{noun}</InputLabel>
                        <Select
                          labelId={`${noun}-label`}
                          id={noun}
                          name={noun}
                          value={values[noun]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!touched.prefix && !!errors.prefix}
                          label={noun}
                        >
                          <MenuItem value="">None</MenuItem>
                          {Requirements[noun].map((item: any) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
      
                      </FormControl>
                    ))} */}

                            <FormControl fullWidth sx={{ mb: 6 }}>
                                <InputLabel
                                    id="demo-simple-select-standard-label"
                                >Select BusinessLocation </InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-simple-select-standard-label"
                                    name='businessLocation'
                                    value={values.businessLocation}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.prefix && !!errors.prefix}
                                    label="Select BusinessLocation"
                                >
                                    {Object.keys(Requirements).length === 0 ? null :
                                        Requirements.BusinessLocation.map((item: any) => (
                                            <MenuItem
                                                value={item.name}
                                                key={item.id}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>

                            {/*
                      drop down for ProductPrice
                    */}
                            <FormControl fullWidth sx={{ mb: 6 }}>
                                <InputLabel
                                    id="demo-simple-select-standard-label"
                                >Select ProductPrice </InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-simple-select-standard-label"
                                    name='ProductPrice'
                                    value={values.ProductPrice}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.prefix && !!errors.prefix}
                                    label="Select ProductPrice"
                                >
                                    {Object.keys(Requirements).length === 0 ? null :
                                        Requirements.ProductPrice.map((item: any) => (
                                            <MenuItem
                                                value={item.name}
                                                key={item.id}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>

                            {/*
                      drop down for accounts
                    */}


                            {/*
                      drop down for agents
                    */}



                            {/*
                      drop down for contacts
                    */}

                            <FormControl fullWidth sx={{ mb: 6 }}>
                                <InputLabel
                                    id="demo-simple-select-standard-label"
                                >Select contacts </InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-simple-select-standard-label"
                                    name='contacts'
                                    value={values.contacts}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.prefix && !!errors.prefix}
                                    label="Select contacts"
                                >
                                    {Object.keys(Requirements).length === 0 ? null :
                                        Requirements.contacts.map((item: any) => (
                                            <MenuItem
                                                value={item.id}
                                                key={item.id}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>

                            {/*
                      drop down for cost_center
                    */}



                            {/*
                      drop down for gender
                    */}



                            {/*
                        drop down for marital
                      */}


                            {/*
                        drop down for patterns
                      */}


                            {/*
                        drop down for roles
                      */}


                            {/*
                        drop down for taxes
                      */}

                            <FormControl fullWidth sx={{ mb: 6 }}>
                                <InputLabel
                                    id="demo-simple-select-standard-label"
                                >Select taxes </InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-simple-select-standard-label"
                                    name='taxes'
                                    value={values.taxes}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.prefix && !!errors.prefix}
                                    label="Select taxes"
                                >
                                    {Object.keys(Requirements).length === 0 ? null :
                                        Requirements.taxes.map((item: any) => (
                                            <MenuItem
                                                value={item.id}
                                                key={item.id}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>

                            {/*
                        drop down for warehouse
                      */}



                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
                                    Submit
                                </Button>
                                <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
                                    Cancel
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Drawer>
    );
};
