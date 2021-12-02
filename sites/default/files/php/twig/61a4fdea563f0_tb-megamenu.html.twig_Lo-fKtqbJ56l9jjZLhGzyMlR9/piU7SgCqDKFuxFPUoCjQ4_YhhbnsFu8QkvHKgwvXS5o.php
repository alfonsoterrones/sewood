<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* modules/tb_megamenu/templates/tb-megamenu.html.twig */
class __TwigTemplate_e2687a49ee3e17866985d0f0ae1e95d5add425585caad25f639d943fe1a52077 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["if" => 1];
        $filters = ["escape" => 4];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['if'],
                ['escape'],
                []
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->getSourceContext());

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 1
        if ((isset($context["css_style"]) || array_key_exists("css_style", $context))) {
            // line 2
            echo "<style type=\"text/css\">
  .tbm.animate .tbm-item > .tbm-submenu, .tbm.animate.slide .tbm-item > .tbm-submenu > div {
  ";
            // line 4
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["css_style"] ?? null)), "html", null, true);
            echo "
  }
</style>
";
        }
        // line 8
        echo "<nav ";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["attributes"] ?? null)), "html", null, true);
        echo ">
  ";
        // line 9
        if ((($context["section"] ?? null) == "frontend")) {
            // line 10
            echo "    <button class=\"tbm-button\" type=\"button\">
      <span class=\"tbm-button-container\">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>
    <div class=\"tbm-collapse ";
            // line 18
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar((($this->getAttribute(($context["block_config"] ?? null), "always-show-submenu", [], "array")) ? (" always-show") : ("")));
            echo "\">
  ";
        }
        // line 20
        echo "  ";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["content"] ?? null)), "html", null, true);
        echo "
  ";
        // line 21
        if ((($context["section"] ?? null) == "frontend")) {
            // line 22
            echo "    </div>
  ";
        }
        // line 24
        echo "</nav>

<script>
";
        // line 28
        echo "if (window.matchMedia(\"(max-width: ";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["block_config"] ?? null), "breakpoint", [], "array")), "html", null, true);
        echo "px)\").matches) {
  document.getElementById(\"";
        // line 29
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["attributes"] ?? null), "id", [])), "html", null, true);
        echo "\").classList.add('tbm--mobile')
}
</script>";
    }

    public function getTemplateName()
    {
        return "modules/tb_megamenu/templates/tb-megamenu.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  111 => 29,  106 => 28,  101 => 24,  97 => 22,  95 => 21,  90 => 20,  85 => 18,  75 => 10,  73 => 9,  68 => 8,  61 => 4,  57 => 2,  55 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "modules/tb_megamenu/templates/tb-megamenu.html.twig", "/homepages/7/d891541503/htdocs/modules/tb_megamenu/templates/tb-megamenu.html.twig");
    }
}
