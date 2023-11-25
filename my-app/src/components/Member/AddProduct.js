import React, { useEffect } from 'react'
import API from '../API/API'
import FormError from './FormError';
import { useNavigate } from 'react-router';
export default function AddProduct() {
    const navigate = useNavigate();
    const [getInput, setGetInput] = React.useState({
        name: '',
        price: '',
        category: '',
        brand: '',
        company: '',
        detail: '',
        status: '',
        sale: ''
    });
    const [getFiles, setFiles] = React.useState([]);
    function handleChangeImage(e) {
        const name = e.target.name;
        const files = e.target.files;
        setFiles(state => {
            return {
                ...state,
                [name]: files
            }
        })
    }
    function handleChange(e) {
        const { name, value } = e.target;
        setGetInput(state => {
            return {
                ...state,
                [name]: value
            }
        })
    }
    const [categories, setCategories] = React.useState([])
    const [brands, setBrands] = React.useState([])
    useEffect(() => {
        API.get('/category-brand')
            .then(response => {
                setCategories(response.data.category)
                setBrands(response.data.brand)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);
    function fetchCategory() {
        return categories.map((value, index) => {
            return (
                <option key={index} value={value.id}>{value.category}</option>
            )
        })
    };
    function fetchBrand() {
        return brands.map((value, index) => {
            return (
                <option key={index} value={value.id}>{value.brand}</option>
            )
        })
    };
    const [getError, setError] = React.useState("");
    function handleSubmit(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if (getInput.name === '') {
            errorSubmit.name = 'Name is required!';
            flag = false;
        }
        if (getInput.price === '') {
            errorSubmit.price = 'Price is required!';
            flag = false;
        }
        if (getInput.category === '') {
            errorSubmit.category = 'Category is required!';
            flag = false;
        }
        if (getInput.brand === '') {
            errorSubmit.brand = 'Brand is required!';
            flag = false;
        }
        if (getInput.company === '') {
            errorSubmit.company = 'Company is required!';
            flag = false;
        }
        if (getInput.detail === '') {
            errorSubmit.detail = 'Detail is required!';
            flag = false;
        }
        if (getInput.status === '') {
            errorSubmit.status = 'Status is required!';
            flag = false;
        }
        if (getFiles.length === 0) {
            errorSubmit.files = 'File is required!';
            flag = false;
        }
        else {
            const typeFile = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'];
            if (getFiles.files) {
                Object.keys(getFiles.files).forEach((key) => {
                    if (typeFile.indexOf(getFiles.files[key].type) === -1) {
                        errorSubmit.files = 'File is not valid!';
                        flag = false;
                    }
                    else if (getFiles.files[key].size > 1024 * 1024) {
                        errorSubmit.files = 'File is too large!';
                        flag = false;
                    }
                });
                if (Object.keys(getFiles.files).length > 3) {
                    errorSubmit.files = 'Maximun 3 files!';
                    flag = false;
                }
            }
        }
        if (!flag) {
            setError(errorSubmit);
        }
        else {
            let formData = new FormData();
            formData.append('name', getInput.name);
            formData.append('price', getInput.price);
            formData.append('category', getInput.category);
            formData.append('brand', getInput.brand);
            formData.append('company', getInput.company);
            formData.append('detail', getInput.detail);
            formData.append('status', getInput.status);
            formData.append('sale', getInput.sale);
            Object.keys(getFiles.files).forEach((key) => {
                formData.append('file[]', getFiles.files[key]);
            });
            let url = '/user/product/add';
            let accessToken = localStorage.getItem('token');
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            }
            API.post(url, formData, config)
                .then(res => {
                    if (res.data.errors) {
                        setError(res.data.errors);
                    }
                    else {
                        navigate('/account/my-product');
                    }
                }
                )
                .catch(err => {
                    console.log(err);
                }
                );
        }
    }
    function fetchImage() {
        if (getFiles.files !== undefined) {
            return Object.keys(getFiles.files).map((key, index) => {
                return (
                    <div key={index} style={{ width: '100px', height: '100px', margin: '0px 5px 10px 0px' }}>
                        <img key={index} src={require('./img/' + getFiles.files[key].name)} alt="" style={{ width: '100px', height: '100px', marginRight: '10px', border: '1px solid #fe980f' }} />
                        <i className="fa fa-times" style={{ position: 'relative', top: '-100px', left: '80px', cursor: 'pointer', color: '#fe980f', fontSize: '20px' }} onClick={() => handleDeleteImage(key)}></i>
                    </div>
                )
            })
        }
    }
    function handleDeleteImage(key) {
        setFiles(state => {
            return {
                ...state,
                files: Object.keys(state.files).reduce((result, value) => {
                    if (value !== key) {
                        result[value] = state.files[value];
                    }
                    return result;
                }, {})
            }
        })
    }
    function showSaleInput() {
        if (getInput.status === '0') {
            return (
                <input type="number" name="sale" placeholder="Sale (%)" onChange={handleChange} />
            )
        }
    }
    return (
        <div className="col-sm-5 col-sm-offset-1">
            <div className="signup-form">
                <h2>Add Product</h2>
                <form encType="multipart/form-data" method='post' onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Product Name" onChange={handleChange} />
                    <input type="number" name="price" placeholder="Product Price" onChange={handleChange} />
                    <select className="form-select" name='category' onChange={handleChange}>
                        <option>Categories</option>
                        {fetchCategory()}
                    </select>
                    <select className="form-select" name="brand" onChange={handleChange}>
                        <option>Brand</option>
                        {fetchBrand()}
                    </select>
                    <select className="form-select" name='status' onChange={handleChange}>
                        <option>Status</option>
                        <option value="0">Sale</option>
                        <option value="1">New</option>
                    </select>
                    {showSaleInput()}
                    <input type="text" name="company" placeholder="Company" onChange={handleChange} />
                    <input type="file" name='files' onChange={handleChangeImage} multiple />
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {fetchImage()}
                    </div>
                    <textarea name="detail" placeholder="Description" onChange={handleChange}></textarea>
                    <button type="submit" className="btn btn-default">Add Product</button>
                </form>
                <FormError error={getError} />
            </div>
        </div>
    )
}
