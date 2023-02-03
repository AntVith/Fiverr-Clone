from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name = 'John', last_name ='Doe' , username='DemoUser', profile_photo = 'https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg', balance=1200, bio='Software Engineer with a passion to contribute to something meaningful',  email='demo@aa.io', password='password')
    marnie = User(
        first_name = 'Marnie', last_name = 'Bills' , username='MarnieBills', profile_photo = 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg', balance=1100, bio='Senior Developer',  email='marnie@aa.io', password='password')
    bobbie = User(
        first_name = 'Bobbie', last_name ='Flay' , username='BobbieFlay', profile_photo = 'https://w0.peakpx.com/wallpaper/979/89/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face-thumbnail.jpg', balance=100, bio='Python Proficient software engineer',  email='bobbie@aa.io', password='password')
    Anthony = User(
        first_name = 'Anthony', last_name ='Mathew' , username='AMatProTutor', profile_photo = 'https://www.morganstanley.com/content/dam/msdotcom/people/tiles/isaiah-dwuma.jpg.img.490.medium.jpg/1594668408164.jpg', balance=1000, bio='Software Engineering tutor for Python, JavaScript, React, Ruby, C++',  email='amat@aa.io', password='password')
    Tina = User(
        first_name = 'Tina', last_name ='Tina' , username='TinaSE', profile_photo = 'https://www.shutterstock.com/image-photo/close-headshot-portrait-young-20s-260nw-1921270919.jpg', balance=500, bio='Freelance Python Developer willing to provide help with all your Python needs',  email='tina@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(Anthony)
    db.session.add(Tina)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
