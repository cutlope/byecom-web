import { useEffect, useState } from 'react';
import { httpClient } from './config';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchsignup, fetchAuth, fetchAuthShow } from '../../../redux/actions';
import useCookies from 'next-cookies';
import { fetchCustomer } from '../../../redux/actions/Customer';
import { fetchTemplate, fetchselectTemplate } from '../../../redux/actions/Template';

export const useProvideAuth = () => {
  const [authUser, setAuthUser] = useState(true);
  const [error, setError] = useState('');
  const [message, setSuccess] = useState('');
  const [loadingAuthUser, setLoadingAuthUser] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchStart = () => {
    setLoading(true);
    setError('');
  };

  const fetchSuccess = (message) => {
    setLoading(false);
    setSuccess(message);
  };

  const fetchError = (error) => {
    setLoading(false);
    setError(error);
  };
  const userLogin = (user) => {
    fetchStart();
    httpClient
      .post('auth/login', user)
      .then((res) => {
        fetchSuccess();
        localStorage.setItem('user', JSON.stringify(res.data.token));
        setAuthUser(user);
        httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
        localStorage.setItem('token', res.data.token);
        getAuthUser();
      })
      .catch((error) => {
        fetchError(error.response.data.errorMessage);
      });
  };

  const userSignup = (user) => {
    fetchStart();
    httpClient
      .post('auth/adduser', user)
      .then((res) => {
        dispatch(fetchAuthShow(true));
        if (res.data.status != 400) {
          setTimeout(() => {
            dispatch(fetchAuthShow(false));
          }, 1500);
          fetchSuccess('Please Check Your Email');
          dispatch(fetchsignup(res.data.verifyType));
          if (localStorage.getItem('user') != '') {
            router.push('/verifyotp');
          }
        } else {
          fetchError(res.data.message.message);
        }
      })
      .catch(function (error) {
        console.log(error.response);
        fetchError(error.response.data.errorMessage);
      });
  };

  const sendPasswordResetEmail = (email) => {
    fetchStart();
    httpClient
      .post('auth/forgotpass', email)
      .then((res) => {
        dispatch(fetchAuthShow(true));
        if (res.data.status != 400) {
          setTimeout(() => {
            dispatch(fetchAuthShow(false));
          }, 1500);
          fetchSuccess('Please Check Your Email');
          router.push('/reset-password');
        } else {
          fetchError(res.data.message.message);
        }
      })
      .catch(function (error) {
        fetchError(error.response.data.errorMessage);
      });
  };

  const confirmPasswordReset = (email) => {
    fetchStart();
    httpClient
      .post('auth/resetpass', email)
      .then((res) => {
        dispatch(fetchAuthShow(true));
        if (res.data.status != 400) {
          setTimeout(() => {
            dispatch(fetchAuthShow(false));
          }, 1500);
          fetchSuccess('Password Changed Succesfully');
          router.push('/signin');
        } else {
          fetchError(res.data.message.message);
        }
      })
      .catch(function (error) {
        fetchError(error.response.data.errorMessage);
      });
  };
  const VerifyOTP = (email) => {
    fetchStart();

    httpClient
      .post('auth/verify/otp', email)
      .then((res) => {
        dispatch(fetchAuthShow(true));
        if (res.data.status != 400) {
          setTimeout(() => {
            dispatch(fetchAuthShow(false));
          }, 1500);
          fetchSuccess('Register Successfully');
          router.push('/signin');
        } else {
          fetchError(res.data.message.message);
        }
      })
      .catch(function (error) {
        fetchError(error.response.data.errorMessage);
      });
  };

  const Listcustomer = () => {
    fetchStart();
    httpClient
      .get('security/get-all-customers')
      .then((res) => {
        fetchSuccess();
        dispatch(fetchCustomer(res.data));
      })
      .catch(function (error) {
        // fetchError(error.message);
      });
  };
  const Addcustomer = (name) => {
    fetchStart();
    httpClient
      .post('security/add-customer', name)
      .then((res) => {
        if (res.data) {
          fetchSuccess('Customer Added Successfully');
          router.push('/admin/customer');
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };
  const Updatecustomer = (id, body) => {
    fetchStart();
    httpClient
      .put(`security/update-customer/${id}`, body)
      .then((res) => {
        if (res.data) {
          fetchSuccess('Customer Updated Successfully');
          router.push('/admin/customer');
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };
  const Listtemplate = () => {
    fetchStart();
    httpClient
      .get('templates/get-templates')
      .then((res) => {
        fetchSuccess();
        dispatch(fetchTemplate(res.data));
      })
      .catch(function (error) {
        // fetchError(error.message);
      });
  };
  const Addtemplate = (name) => {
    fetchStart();
    httpClient
      .post('templates/add-template', name)
      .then((res) => {
        if (res.data) {
          fetchSuccess('Template Added Successfully');
          router.push('/admin/template');
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };
  const Selecttemplate = (id) => {
    fetchStart();
    httpClient
      .get(`templates/get-template/${id}`)
      .then((res) => {
        fetchSuccess();
        // dispatch(fetchselectTemplate(res.data))
      })
      .catch(function (error) {
        // fetchError(error.message);
      });
  };
  const Updatetemplate = (id, body) => {
    fetchStart();
    httpClient
      .put(`templates/update-template/${id}`, body)
      .then((res) => {
        if (res.data) {
          fetchSuccess('Template Updated Successfully');
          router.push('/admin/template');
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };

  const renderSocialMediaLogin = () => null;

  const userSignOut = (callbackFun) => {
    try {
      fetchStart();
      setTimeout(() => {
        fetchSuccess();
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setAuthUser(false);
        if (callbackFun) callbackFun();
      }, 300);
    } catch (error) {
      fetchError(error.message);
    }
  };

  const getAuthUser = () => {
    fetchStart();
    httpClient
      .get('users/me')
      .then((res) => {
        if (res.data.user) {
          fetchSuccess();
          dispatch(fetchAuth(res.data.user));
          setAuthUser(JSON.parse(localStorage.getItem('user')));
        }
      })
      .catch(function (error) {
        httpClient.defaults.headers.common['Authorization'] = '';
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
    httpClient
      .get('users/me')
      .then((res) => {
        if (res.data.user) {
          fetchSuccess();
          dispatch(fetchAuth(res.data.user));
          setAuthUser(JSON.parse(localStorage.getItem('user')));
        }
        setLoadingAuthUser(false);
      })
      .catch(function (error) {
        httpClient.defaults.headers.common['Authorization'] = '';
        setLoadingAuthUser(false);
      });
  }, []);

  // Return the user object and auth methods
  return {
    loadingAuthUser,
    isLoading,
    authUser,
    error,
    message,
    setError,
    setSuccess,
    setAuthUser,
    getAuthUser,
    userLogin,
    userSignup,
    userSignOut,
    renderSocialMediaLogin,
    sendPasswordResetEmail,
    confirmPasswordReset,
    VerifyOTP,
    Listcustomer,
    Addcustomer,
    Updatecustomer,
    Listtemplate,
    Addtemplate,
    Selecttemplate,
    Updatetemplate,
  };
};
