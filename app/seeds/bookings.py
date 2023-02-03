from app.models import db, Booking, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_bookings():
    booking_1 = Booking(
        user_id = 1, service_id =2 , instructions='I have a start up built with javascript ready for your help.')
    booking_2 = Booking(
        user_id = 2, service_id =3 , instructions='I need my react fronted set up for my side hustle.')
    booking_3 = Booking(
        user_id = 3, service_id =1 , instructions='I have a website clone project built with python I need help with.')
    booking_4 = Booking(
        user_id = 1, service_id =10 , instructions='I have a personal python project that could use your expertise in setting up.')
    booking_5 = Booking(
        user_id = 1, service_id =9 , instructions='I want to progress my React skills and your help would be the perfect resource!')
    booking_6 = Booking(
        user_id = 2, service_id =10 , instructions='With your help we can set up the foundation to build on for my start-up.')
    booking_7 = Booking(
        user_id = 3, service_id =4 , instructions='I can use your help to progress my DS&A skills to do well on my interviews.')

    db.session.add(booking_1)
    db.session.add(booking_2)
    db.session.add(booking_3)
    db.session.add(booking_4)
    db.session.add(booking_5)
    db.session.add(booking_6)
    db.session.add(booking_7)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_bookings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM bookings")

    db.session.commit()
