<?php

namespace Drupal\custom_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Block\BlockPluginInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Database\Connection;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Access\AccessResult;

/**
 * @Block(
 *   id = "bloque_personalizado",
 *   admin_label = @Translation("Bloque personalizado"),
 * )
 */
class FrontAppsBlock extends BlockBase implements BlockPluginInterface
{

  public function build()
  {
    return [
      '#theme' => 'custom_blocks__front_apps',
      '#titulo' => $this->configuration['titulo'],
      '#descripcion' => $this->configuration['descripcion'],
    ];
  }

  public function blockForm($form, FormStateInterface $form_state)
  {
    $form['forcontu_blocks_titulo'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Título'),
      '#default_value' => $this->configuration['titulo'],
    );
    $form['forcontu_blocks_descripcion'] = array(
      '#title' => $this->t('Descripción'),
      '#type' => 'textarea',
      '#description' => 'Vamos a insetar la descripción del párrafo',
      '#default_value' => $this->configuration['descripcion'],
      '#rows' => 10,
      '#cols' => 60,
      '#resizable' => TRUE,
    );

    return $form;
  }

  public function defaultConfiguration()
  {
    return array(
      'titulo' => 'Agreguemos el título',
      'descripcion' => 'Aquí insertaremos la nueva configuración'
    );
  }

  public function blockValidate($form, FormStateInterface $form_state)
  {
    if (strlen($form_state->getValue('forcontu_blocks_titulo')) < 5) {
      $form_state->setErrorByName('forcontu_blocks_titulo', $this->t('El título es demasiado corto'));
    }
  }

  public function blockSubmit($form, FormStateInterface $form_state)
  {
    $this->configuration['titulo'] = $form_state->getValue('forcontu_blocks_titulo');
    $this->configuration['descripcion'] = $form_state->getValue('forcontu_blocks_descripcion');
  }

  protected function blockAccess(AccountInterface $account)
  {
    return AccessResult::allowedIfHasPermission($account, 'access highlighted content block');
  }
}
