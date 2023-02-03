from app.models import db, Service, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_services():
    service_1 = Service(
        user_id = 1, title='Python backend proficient offering these skills ' , description='I can help with engineering regarding python frontend and backend.', price = 150 , thumbnail= 'https://www.python.org/static/community_logos/python-logo-master-v3-TM-flattened.png')
    service_2 = Service(
        user_id = 2, title='I will help you with your JavaScript Backend' , description='I have decades of JS experience and am willing to utilize that to help you with your project.', price = 300 , thumbnail= 'https://cdn.geekboots.com/geek/javascript-meta-1652702081069.jpg')
    service_3 = Service(
        user_id = 3, title='React State and Set-Up' , description='I will help you set up your react State Shape and your react frontend', price = 400 , thumbnail= 'https://www.goodworklabs.com/wp-content/uploads/2016/10/reactjs.png')
    service_4 = Service(
        user_id = 1, title='I will help you practice DS&A with Python' , description='I will help you practice data structures and algorithms questions to help you ace your next technical interview.', price = 199 , thumbnail= 'https://media.geeksforgeeks.org/wp-content/uploads/20211118125839/PythonDataStructuresandAlgorithms.png')
    service_5 = Service(
        user_id = 2, title='I will help with your JavaScript Frontend' , description='I will help you set up your JS frontend to your liking and to full functionality.', price = 444 , thumbnail= 'https://cdn.geekboots.com/geek/javascript-meta-1652702081069.jpg')
    service_6 = Service(
        user_id = 3, title='I will assist you in setting up your Frontend ' , description='I will help you set up your frontend and connect your frontend to your backend.', price = 100 , thumbnail= 'https://c8.alamy.com/comp/W3XF7X/front-end-concept-illustration-using-code-for-developing-programs-and-app-front-end-website-code-with-colourful-tags-in-browser-view-on-dark-backgrou-W3XF7X.jpg')
    service_7 = Service(
        user_id = 1, title='I will tutor and help you with JavaScript' , description='I will provide practice problems and scenarios for you to fine tune your JS skillset.', price = 250 , thumbnail= 'https://www.codecademy.com/resources/blog/wp-content/uploads/2022/12/what-is-javascript-used-for.png')
    service_8 = Service(
        user_id = 4, title='I will tutor and help you with Python' , description='I will provide practice problems and DS&A questions and scenarios for you to further your Python skillset.', price = 250 , thumbnail= 'https://cdn.activestate.com/wp-content/uploads/2021/12/python-coding-mistakes.jpg')
    service_9 = Service(
        user_id = 4, title='I will tutor and help you with all things React' , description='I will teach you how to set up your React state shape, reducer, thunk, action creator, and frontend.', price = 300, thumbnail= 'https://miro.medium.com/max/1200/1*hYSKyofnqThnPIsYRfnUUQ.png')
    service_10 = Service(
        user_id = 5, title='Skilled Python programmer offering any and all help' , description='I will help with any project you may have regarding Python frontend or backend.', price = 444 , thumbnail= 'https://miro.medium.com/max/693/1*KzSyurAkoy2xr1RecfChvA.png')
    service_11 = Service(
        user_id = 5, title='Python tutor with strong skillset' , description='I will help you learn a lot about Python and how to utilize it for your needs.', price = 249, thumbnail= 'https://previews.123rf.com/images/yurich84/yurich842001/yurich84200100009/137161264-3d-render-of-python-tutorial-programming-tutorial-coding-concept-python-language-e-learning-online-e.jpg')



    db.session.add(service_1)
    db.session.add(service_2)
    db.session.add(service_3)
    db.session.add(service_4)
    db.session.add(service_5)
    db.session.add(service_6)
    db.session.add(service_7)
    db.session.add(service_8)
    db.session.add(service_9)
    db.session.add(service_10)
    db.session.add(service_11)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_services():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.services RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM services")

    db.session.commit()
