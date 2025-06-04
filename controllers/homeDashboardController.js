export const renderHomeDashboard = async (req, res) => {
    const userData = req.session.user.name
    res.render('home', {
        layout:'layouts/admin',
        userData
    });
}