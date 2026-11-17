export const testErrorPage = (req, res, next) => {
    next(new Error('This is a test error'));
};