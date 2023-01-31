from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name = 'John', last_name ='Doe' , username='Demo', profile_photo = 'https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg', balance=1200, bio='Junior Developer',  email='demo@aa.io', password='password')
    marnie = User(
        first_name = 'Marnie', last_name = 'Bills' , username='marnie', profile_photo = 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg', balance=1100, bio='Senior Developer',  email='marnie@aa.io', password='password')
    bobbie = User(
        first_name = 'Bobbie', last_name ='Flay' , username='Filay', profile_photo = 'https://w0.peakpx.com/wallpaper/979/89/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face-thumbnail.jpg', balance=100, bio='Python Proficient',  email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
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
