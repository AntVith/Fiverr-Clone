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
        user_id = 5, title='Skilled Python programmer offering any and all help' , description='I will help with any project you may have regarding Python frontend or backend.', price = 449 , thumbnail= 'https://miro.medium.com/max/693/1*KzSyurAkoy2xr1RecfChvA.png')
    service_11 = Service(
        user_id = 5, title='Python tutor with strong skillset' , description='I will help you learn a lot about Python and how to utilize it for your needs.', price = 249, thumbnail= 'https://miro.medium.com/max/1400/1*7dhtxFfep_DGrRACWuRiEQ.jpeg' )
    service_12 = Service(
        user_id = 4, title='Tutoring mentor for progression in DS&A skills' , description='I will give you problems to practice and guide you when you need help. You will ace your next Interview!', price = 499, thumbnail= 'https://algozenith.com/assets/coursepage/Img/imageaz202.png')
    service_13 = Service(
        user_id = 2, title='Providing app layout and designing skills' , description='I have over 30 years of experience with top tech, setting up the UX of their webpages. Let me help you!', price = 799 , thumbnail= 'https://buildfire.com/wp-content/uploads/2022/03/The-Best-App-Layout-Ideas-For-Amazing-User-Experience@3x-scaled.jpg')
    service_14 = Service(
        user_id = 3, title='Python debugging assistance' , description='If you are having trouble debugging your Python project, I will use my skills to help you solve this.', price = 99, thumbnail= 'https://media.geeksforgeeks.org/wp-content/uploads/20190902105053/Debugging-Tips-To-Get-Better-At-It.png')
    service_15 = Service(
        user_id = 4, title='Tutoring service for all things Ruby' , description='With my knowledge of Ruby I can teach you the major and minor aspects of working with Ruby.', price = 189, thumbnail= 'https://www.2n.pl/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBJdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--30e03dcd14b9a9906378d349ea465e9958851719/ruby_logo.png')
    service_16 = Service(
        user_id = 4, title='C++ experienced Programmer offering knowledge and guidance' , description='The first langauge I learned was C++ so I have years of experience that can be useful to help you.', price = 1100 , thumbnail= 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/titleShadow-1024x341.png')
    service_17 = Service(
        user_id = 5, title='Setting up your Python backend? Look no further!' , description='No matter if you are starting from scratch or touching up your application my knowledge and skills can help you.', price = 639, thumbnail= 'https://previews.123rf.com/images/yurich84/yurich842001/yurich84200100009/137161264-3d-render-of-python-tutorial-programming-tutorial-coding-concept-python-language-e-learning-online-e.jpg' )
    service_18 = Service(
        user_id = 3, title='Learning code for the first time? I will teach you Python to kickstart your learning!' , description='Starting with if statements and for loops to creating a whole application, I will teach you everything you need to know about Python.', price = 544, thumbnail= 'https://www.incimages.com/uploaded_files/image/1920x1080/html-code-on-blackboard_pan_15454.jpg')
    service_19 = Service(
        user_id = 2, title='Managing a tech company can by difficult, let me help you!' , description='I have built two tech companies from the ground up and have sold both for over $50 million each. Let me help you accomplish the same thing!', price = 999 , thumbnail= 'https://images.propertycasualty360.com/contrib/content/uploads/sites/414/2019/05/02-tech-modernization-Shutterstock.jpeg')


    db.session.add(service_7)
    db.session.add(service_19)
    db.session.add(service_12)
    db.session.add(service_17)
    db.session.add(service_16)
    db.session.add(service_2)
    db.session.add(service_18)
    db.session.add(service_3)
    db.session.add(service_8)
    db.session.add(service_11)
    db.session.add(service_4)
    db.session.add(service_1)
    db.session.add(service_6)
    db.session.add(service_9)
    db.session.add(service_10)
    db.session.add(service_15)
    db.session.add(service_13)
    db.session.add(service_14)
    db.session.add(service_5)

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
