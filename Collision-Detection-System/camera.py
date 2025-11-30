import cv2
from detection import AccidentDetectionModel
import numpy as np
import os
import time
from dotenv import load_dotenv

load_dotenv()

emergency_timer = None
alarm_triggered = False

model = AccidentDetectionModel("model.json", "model_weights.keras")
font = cv2.FONT_HERSHEY_SIMPLEX


def save_accident_photo(frame):
    try:
        current_date_time = time.strftime("%Y-%m-%d-%H%M%S")
        directory = "accident_photos"
        if not os.path.exists(directory):
            os.makedirs(directory)
        filename = f"{directory}/{current_date_time}.jpg"
        cv2.imwrite(filename, frame)
        print(f"Accident photo saved as {filename}")
        return filename
    except Exception as e:
        print(f"Error saving accident photo: {e}")

def startapplication(videoPath):
    global alarm_triggered  
    alarm_triggered = False  

    video = cv2.VideoCapture(videoPath)
    photopath = None

    while True:
        ret, frame = video.read()
        if not ret:
            break

        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        roi = cv2.resize(gray_frame, (250, 250))
        pred, prob = model.predict_accident(roi[np.newaxis, :, :])
        prob_value = float(prob[0][0]) * 100

        if pred == "Accident" and not alarm_triggered and prob_value > 90:
            photopath = save_accident_photo(frame)
            print(f"Accident detected with {prob_value:.2f}% confidence")
            alarm_triggered = True
            break

    video.release()
    cv2.destroyAllWindows()

    return photopath


if __name__ == '__main__':
    startapplication()
