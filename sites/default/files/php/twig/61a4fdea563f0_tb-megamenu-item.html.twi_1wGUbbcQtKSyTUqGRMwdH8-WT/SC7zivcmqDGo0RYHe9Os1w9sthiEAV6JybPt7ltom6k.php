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

/* modules/tb_megamenu/templates/tb-megamenu-item.html.twig */
class __TwigTemplate_a6567052450e2d8ffa444fd2688ca0d4bc5b7f55453ef7693ac507b71117c4bf extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["set" => 1, "if" => 2];
        $filters = ["escape" => 10, "t" => 29];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if'],
                ['escape', 't'],
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
        $context["linkAttributes"] = $this->getAttribute(($context["link"] ?? null), "attributes", [], "array");
        // line 2
        if (($this->getAttribute(($context["link"] ?? null), "url", [], "array", true, true) &&  !twig_test_empty($this->getAttribute(($context["link"] ?? null), "url", [], "array")))) {
            // line 3
            echo "  ";
            $context["tag"] = "a";
        } else {
            // line 5
            echo "  ";
            $context["tag"] = "span";
            // line 6
            echo "  ";
            if (twig_test_empty(($context["submenu"] ?? null))) {
                // line 7
                echo "    ";
                $context["linkAttributes"] = $this->getAttribute(($context["linkAttributes"] ?? null), "addClass", [0 => "tbm-no-submenu"], "method");
                // line 8
                echo "  ";
            }
        }
        // line 10
        echo "<li ";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["attributes"] ?? null)), "html", null, true);
        echo " >
  ";
        // line 11
        if ((($context["section"] ?? null) == "frontend")) {
            // line 12
            echo "    <div class=\"tbm-link-container\">
  ";
        }
        // line 14
        echo "    ";
        if ((($context["tag"] ?? null) == "a")) {
            // line 15
            echo "      <";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["tag"] ?? null)), "html", null, true);
            echo " href=\"";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["link"] ?? null), "url", [], "array")), "html", null, true);
            echo "\" ";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["link"] ?? null), "attributes", [], "array")), "html", null, true);
            echo ">
    ";
        } else {
            // line 17
            echo "      <";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["tag"] ?? null)), "html", null, true);
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["link"] ?? null), "attributes", [], "array")), "html", null, true);
            echo ">
    ";
        }
        // line 19
        echo "      ";
        if ((($context["fontawesome"] ?? null) && $this->getAttribute(($context["item_config"] ?? null), "xicon", [], "array"))) {
            // line 20
            echo "        <span class=\"";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["item_config"] ?? null), "xicon", [], "array")), "html", null, true);
            echo "\"></span>
      ";
        }
        // line 22
        echo "      ";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["link"] ?? null), "title_translate", [])), "html", null, true);
        echo "
      ";
        // line 23
        if ($this->getAttribute(($context["item_config"] ?? null), "caption", [], "array")) {
            // line 24
            echo "        <span class=\"tbm-caption\">";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["item_config"] ?? null), "caption", [], "array")), "html", null, true);
            echo "</span>
      ";
        }
        // line 26
        echo "    </";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["tag"] ?? null)), "html", null, true);
        echo ">
  ";
        // line 27
        if ((($context["section"] ?? null) == "frontend")) {
            // line 28
            echo "      ";
            if ((($context["submenu"] ?? null) &&  !($context["group"] ?? null))) {
                // line 29
                echo "        <button class=\"tbm-submenu-toggle";
                if ($this->getAttribute(($context["block_config"] ?? null), "auto-arrow", [], "array")) {
                    echo " always-show";
                }
                echo "\"><span class=\"visually-hidden\">";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar(t("Toggle submenu"));
                echo "</span></button>
      ";
            }
            // line 31
            echo "    </div>
  ";
        }
        // line 33
        echo "  ";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["submenu"] ?? null)), "html", null, true);
        echo "
</li>
";
    }

    public function getTemplateName()
    {
        return "modules/tb_megamenu/templates/tb-megamenu-item.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  153 => 33,  149 => 31,  139 => 29,  136 => 28,  134 => 27,  129 => 26,  123 => 24,  121 => 23,  116 => 22,  110 => 20,  107 => 19,  100 => 17,  90 => 15,  87 => 14,  83 => 12,  81 => 11,  76 => 10,  72 => 8,  69 => 7,  66 => 6,  63 => 5,  59 => 3,  57 => 2,  55 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "modules/tb_megamenu/templates/tb-megamenu-item.html.twig", "/homepages/7/d891541503/htdocs/modules/tb_megamenu/templates/tb-megamenu-item.html.twig");
    }
}
