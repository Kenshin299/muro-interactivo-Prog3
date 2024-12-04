import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import UnexpectedAlertPresentException
import os
import time
import HTMLTestRunner
import random

def random_user_append():
    num = random.random() * 100
    return num

random_append = random_user_append()

name = "test"
last_name = "registro_exitoso"
email = f"user{random_append}@test.com"
password = "Pass@1234"

class TestRegistroLogin(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls):
        """Inicialización del WebDriver"""
        cls.driver = webdriver.Chrome()
        cls.driver.maximize_window()

    def take_screenshot(self, test_name):
        """Captura de pantalla en caso de error"""
        screenshot_dir = "screenshots"
        if not os.path.exists(screenshot_dir):
            os.makedirs(screenshot_dir)
        screenshot_path = os.path.join(screenshot_dir, f"{test_name}.png")
        self.driver.save_screenshot(screenshot_path)

    def test_registro_exitoso(self):
        """TC001: Registro con correo único y contraseña válida"""
        driver = self.driver
        driver.get("http://localhost:3000/signup")  # URL_BASE

            # Rellenar el formulario
        driver.find_element(By.ID, "name").send_keys(name)
        driver.find_element(By.ID, "lastName").send_keys(last_name)
        driver.find_element(By.ID, "email-address").send_keys(email)
        driver.find_element(By.ID, "password").send_keys(password)
        driver.find_element(By.CSS_SELECTOR, "input[type='submit']").click() # Boton para enviar formulario de registro

        self.take_screenshot('test_registro_antes')

        try:
            WebDriverWait(driver, 3).until(
                EC.url_contains("/login")
            )
            self.assertEqual(self.driver.current_url, "http://localhost:3000/login", "Test del login completado satisfactoriamente")
            self.take_screenshot('test_registro_exitoso')
        except Exception as e:
            self.take_screenshot('test_registro_fallido')
            raise e

    def test_login_exitoso(self):
        """TC002: Login con credenciales válidas"""
        driver = self.driver
        driver.get("http://localhost:3000/login")
        
        driver.find_element(By.ID, "email-address").send_keys(email)
        driver.find_element(By.ID, "password").send_keys(password)
        driver.find_element(By.CSS_SELECTOR, "input[type='submit']").click()

        self.take_screenshot('test_login_antes')

        time.sleep(2)
        
        try:
            WebDriverWait(driver, 4).until(
                EC.url_contains("/")
            )
            self.assertEqual(self.driver.current_url, "http://localhost:3000/")
            self.assertEqual(self.driver.find_element(By.CLASS_NAME, "PostList").get_dom_attribute("class"), "PostList")
            self.take_screenshot('test_login_exitoso')
        except UnexpectedAlertPresentException as e:
            self.take_screenshot('test_login_fallido')
            self.fail(f"Unexpected alert: {e.alert_text}")
        except Exception as e:
            self.take_screenshot('test_login_fallido')
            raise e

    def test_publicar_post_valido(self):
        """TC003: Publicar post válido"""
        driver = self.driver
        driver.get("http://localhost:3000/login")
        
        driver.find_element(By.ID, "email-address").send_keys(email)
        driver.find_element(By.ID, "password").send_keys(password)
        driver.find_element(By.CSS_SELECTOR, "input[type='submit']").click()

        time.sleep(2)
        driver.find_element(By.ID, "NewPostTitle").send_keys("Idea Test Automatizado")
        driver.find_element(By.ID, "NewPostBody").send_keys("Texto Test Automatizado")
        driver.find_element(By.CSS_SELECTOR, "input[type='submit']").click()

        self.take_screenshot('test_publicar_post_antes')

        try:
            WebDriverWait(driver, 4).until(
                EC.presence_of_element_located((By.CLASS_NAME, "PostList"))
            )
            time.sleep(2)
            self.assertIn("Idea", driver.page_source, "Test de publicacion de posts completado satisfactoriamente")
            self.take_screenshot('test_publicar_post_exitoso')
        except UnexpectedAlertPresentException as e:
            self.take_screenshot('test_publicar_post_fallido')
            self.fail(f"Unexpected alert: {e.alert_text}")
        except Exception as e:
            self.take_screenshot('test_publicar_post_fallido')
            raise e
        
    def test_editar_publicacion(self):
        """TC004: Editar publicación"""
        driver = self.driver
        driver.get("http://localhost:3000/login")
        
        driver.find_element(By.ID, "email-address").send_keys(email)
        driver.find_element(By.ID, "password").send_keys(password)
        driver.find_element(By.CSS_SELECTOR, "input[type='submit']").click()

        time.sleep(2)

        self.assertEqual(driver.current_url, "http://localhost:3000/")        
        driver.find_element(By.XPATH, "//*[@id='root']/div/div/div/div[3]/div[1]/div/button[1]").click()
        
        # Editar la publicación
        title_input = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Editar título']")
        original_title = title_input.get_attribute("value")
        new_title = f"{original_title} - Editado"
        title_input.clear()
        title_input.send_keys(new_title)
        driver.find_element(By.XPATH, "//*[@id='root']/div/div/div/div[3]/div[1]/div/button[1]").click()
        
        self.take_screenshot('test_editar_publicacion_antes')

        try:
            # Verificar que los cambios se reflejan inmediatamente en la página
            WebDriverWait(driver, 4).until(
                EC.presence_of_element_located((By.CLASS_NAME, "PostList"))
            )
            time.sleep(2)

            self.assertIn(new_title, driver.page_source, "La publicación no se ha editado correctamente.")
            self.take_screenshot('test_editar_publicacion_exitoso')

        except Exception as e:
            # Capturar error en caso de que la edición falle
            self.take_screenshot('test_editar_publicacion_fallido')
            self.fail(f"Error inesperado: {e}")

    def test_elimiar_publicacion(self):
        """TC004: Editar publicación"""
        driver = self.driver
        driver.get("http://localhost:3000/login")
        
        driver.find_element(By.ID, "email-address").send_keys(email)
        driver.find_element(By.ID, "password").send_keys(password)
        driver.find_element(By.CSS_SELECTOR, "input[type='submit']").click()

        time.sleep(2)

        self.assertEqual(driver.current_url, "http://localhost:3000/")        

        try:
            driver.find_element(By.XPATH, "//*[@id='root']/div/div/div/div[3]/div[1]/div/button[2]").click() # boton de eliminar

            time.sleep(1)

            self.take_screenshot('test_eliminar_publicacion_antes')
            WebDriverWait(driver, 4).until(
                EC.presence_of_element_located((By.CLASS_NAME, "PostList"))
            )
            time.sleep(2)

            post_list = driver.find_element(By.CLASS_NAME, "PostList").text
            self.assertNotIn("Título de la publicación eliminada", post_list, "La publicación no se ha eliminado correctamente.")
            self.take_screenshot('test_eliminar_publicacion_exitoso')
        except UnexpectedAlertPresentException as e:
            self.take_screenshot('test_eliminar_publicacion_antes')
            time.sleep(2)
            WebDriverWait(driver, 5).until(EC.alert_is_present())
            alert = driver.switch_to.alert
            alert_text = alert.text
            self.assertIn("¿Estás seguro de que deseas eliminar esta publicación?", alert_text)
            self.take_screenshot('test_eliminar_publicacion_antes')
            alert.accept() 
            time.sleep(2)
            self.take_screenshot('test_eliminar_publicacion_exitoso')
        except Exception as e:
            # Capturar error en caso de que la eliminación falle
            self.take_screenshot('test_eliminar_publicacion_fallido')
            self.fail(f"Error inesperado: {e}")
    
    @classmethod
    def tearDownClass(cls):
        """Cerrar el WebDriver después de ejecutar las pruebas"""
        cls.driver.quit()

if __name__ == "__main__":
    suite = unittest.TestSuite()
    suite.addTest(TestRegistroLogin('test_registro_exitoso'))
    suite.addTest(TestRegistroLogin('test_login_exitoso'))
    suite.addTest(TestRegistroLogin('test_publicar_post_valido'))
    suite.addTest(TestRegistroLogin('test_editar_publicacion'))
    # suite.addTest(TestRegistroLogin('test_elimiar_publicacion'))
    runner = HTMLTestRunner.HTMLTestRunner(log=True, output='report', title='Pruebas de Selenium', description='Reporte de pruebas de registro, login y publicación de posts')
    runner.run(suite)