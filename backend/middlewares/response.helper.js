export const generateResponse = (res, status, message, data, success) => {
    if(!Array.isArray(message)){
      message = [message];
    }
    res.status(status).json({
      success,
      message,
      data,
    });
  };