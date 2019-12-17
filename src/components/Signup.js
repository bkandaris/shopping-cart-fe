import React, { useState } from 'react'
import { List, InputItem, Button, WhiteSpace, Flex, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
// import './register.css'

const BasicInputExample = props => {
  const [confirmDirty] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        console.log(values)
      } else {
        window.alert('Validation failed')
      }
    })
  }
  function showToast (error) {
    Toast.info(error, 1)
  }
  const { getFieldProps, getFieldError } = props.form
  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props
    if (value && value !== form.getFieldValue('password')) {
      //   callback('Two passwords that you enter is inconsistent!');
      setErrMessage('passwords do not match!')
    } else {
      callback()
      setErrMessage('')
    }
  }
  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }
  return (
    <form>
      <div className='flex-container'>
        <div style={{ textAlign: 'center' }}>
          <img
            src='https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Ladybug-512.png'
            alt='icon'
            style={{
              paddingTop: '20%',
              borderRadius: '50%',
              paddingBottom: '1em',
              width: '100px',
              height: '20vh'
            }}
          />
          <br />
        </div>
        <div className='form'>
          <List
            renderHeader={() => 'Register new account'}
            renderFooter={() =>
              getFieldError('number', 'confirm') &&
              getFieldError('number', 'confirm').join(',')}
          >
            <InputItem
              {...getFieldProps('number', {
                rules: [
                  {
                    required: true,
                    message: 'Please input number'
                  }
                ]
              })}
              clear
              error={!!getFieldError('number')}
              onErrorClick={() => {
                showToast(getFieldError('number').join('、'))
              }}
              type='number'
              placeholder='phone number'
            />
            <WhiteSpace />
            <InputItem
              {...getFieldProps('password', {
                rules: [
                  {
                    required: true
                  },
                  {
                    validator: validateToNextPassword
                  }
                ]
              })}
              type='password'
              placeholder='password'
            />
            <WhiteSpace />
            <InputItem
              {...getFieldProps('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!'
                  },
                  {
                    validator: compareToFirstPassword
                  }
                ]
              })}
              clear
              error={!!getFieldError('confirm')}
              onErrorClick={() => {
                showToast(getFieldError('confirm').join('、'))
              }}
              type='password'
              placeholder='confirm password'
            />
            <WhiteSpace />
            <Flex justify='center'>
              <Button type='primary' size='small' inline onClick={handleSubmit}>
                Register
              </Button>
            </Flex>
            <WhiteSpace />
          </List>
        </div>
        <div>{errMessage}</div>
        <div>
          or <a href='www'>login</a> instead
        </div>
      </div>
    </form>
  )
}
const BasicInputExampleWrapper = createForm()(BasicInputExample)
export default BasicInputExampleWrapper
